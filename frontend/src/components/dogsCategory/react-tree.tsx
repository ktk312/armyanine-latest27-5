
//final version with css into a separate file

import { useEffect, useRef, useState } from "react";
import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
import axios from "axios";
import {
  FaMars,
  FaVenus,
  FaPlus,
  FaMinus,
  FaRedo,
  FaSun,
  FaMoon,
  FaArrowUp,
} from "react-icons/fa";
import { BASE_URL } from "../../config/constant";
import {
  Box,
  Tooltip,
  IconButton,
  useTheme,
  Skeleton,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import '../dogsCategory/styles/Pedigree.css';
import { Dog } from "./types/dog";
import { DogDetailsModal } from "../ui/modal/dogModals/dogProfileModal";

interface CustomTreeNodeDatum extends TreeNodeDatum {
  id?: string;
  accNumber?: string;
  sex?: string;
  role?: "Sire" | "Dam" | "Unknown";
  depth?: number;
  hasPlaceholder?: boolean;
}

interface ApiNode {
  id: string;
  name: string;
  accNumber?: string;
  sex?: string;
  children?: ApiNode[];
}

const MAX_GENERATIONS = 3;

const createPlaceholderNode = (
  depth: number,
  role: "Sire" | "Dam" | "Unknown" = "Unknown"
): CustomTreeNodeDatum => {
  const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
  const children =
    depth < MAX_GENERATIONS - 1
      ? [
        createPlaceholderNode(depth + 1, "Sire"),
        createPlaceholderNode(depth + 1, "Dam"),
      ]
      : [];

  return {
    id: "",
    name: "No record",
    accNumber: "",
    sex,
    role,
    hasPlaceholder: true,
    children,
    __rd3t: {
      id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`,
      depth,
      collapsed: false,
    },
  };
};

const countNodes = (node: TreeNodeDatum | null): number => {
  if (!node) return 0;
  let count = 1;
  if (node.children) {
    count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
  }
  return count;
};

const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
  const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
  const [dogName, setDogName] = useState<string>("");
  const [zoom, setZoom] = useState(1);
  const [IdDog, setDogId] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewDog, setViewDog] = useState<Dog | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [selectedDog, setSelectedDog] = useState<null>(null);

  const MIN_ZOOM = 0.4;
  const MAX_ZOOM = 2;

  const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";



  const nodeColors = {
    male: isDark ? "#60a5fa" : "#2563eb",
    female: isDark ? "#f472b6" : "#db2777",
    placeholderBg: isDark ? "#374151" : "#f3f4f6",
    textPrimary: isDark ? "#e0e7ff" : "#1f2937",
    textSecondary: isDark ? "#9ca3af" : "#4b5563",
    nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
    nodeBoxShadow: isDark
      ? "0 4px 8px rgba(0,0,0,0.6)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    linkColor: isDark ? "#4b5563" : "#d1d5db",
    activeLink: isDark ? "#60a5fa" : "#3b82f6",
  };
  useEffect(() => {
    const fetchPedigree = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
        setDogName(data.name || "Unknown");
        const sireNode = data.children?.[0] || null;
        const damNode = data.children?.[1] || null;

        setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
        setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
      } catch (err) {
        console.error("Error loading pedigree data:", err);
        setError("Failed to load pedigree data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPedigree();
  }, [dogId]);


  const transformTree = (
    node: ApiNode | null,
    depth = 0,
    role: "Sire" | "Dam" | "Unknown" = "Unknown"
  ): CustomTreeNodeDatum => {
    if (!node || !node.name || node.name.toLowerCase() === "unknown") {
      return createPlaceholderNode(depth, role);
    }

    let children: CustomTreeNodeDatum[] = [];
    if (depth < MAX_GENERATIONS - 1) {
      if (node.children && node.children.length > 0) {
        children = node.children.map((child, idx) =>
          transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
        );
        if (children.length < 2) {
          children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
          children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
        }
      } else {
        children = [
          createPlaceholderNode(depth + 1, "Sire"),
          createPlaceholderNode(depth + 1, "Dam"),
        ];
      }
    }

    return {
      id: node.id,
      name: node.name,
      accNumber: node.accNumber,
      sex: node.sex,
      role,
      depth,
      children,
      __rd3t: {
        id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
        depth,
        collapsed: false,
      },
    };
  };



  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({
        x: width / (isMobile ? 3 : 5),
        y: height / (isMobile ? 5 : 10)
      });
    }
  }, [sireTree, damTree, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowBackToTop(containerRef.current.scrollTop > 100);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
  const resetZoom = () => setZoom(1);
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const fetchDogDetails = async () => {
      if (!IdDog) return;

      try {
        const { data } = await axios.get(`${BASE_URL}/dog/${IdDog}`);
        console.log("Fetched dog data:", data);
        setSelectedDog(data);
        // Open modal after data is fetched
        setViewDog(data);
        setIsViewModalOpen(true);

      } catch (error) {
        console.error("Error fetching dog details:", error);
      }
    };

    fetchDogDetails();
  }, [IdDog]);
  const getNodeDimensions = () => {
    if (isMobile) return { width: 120, height: 36, fontSize: 11, accFontSize: 8, genFontSize: 7, iconSize: 10 };
    return { width: 160, height: 50, fontSize: 13, accFontSize: 10, genFontSize: 9, iconSize: 14 };
  };

  const nodeDimensions = getNodeDimensions();

  const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
    const customNode = nodeDatum as CustomTreeNodeDatum;
    const isMale = customNode.sex === "Male";
    // if (customNode.id) {
    //   setDogId(customNode.id);
    // }

    return (
      <g
        className={`custom-node group ${customNode.sex?.toLowerCase() || 'unknown'} ${customNode.hasPlaceholder ? 'placeholder' : ''}`}
        style={{ cursor: "default" }}
      onClick={() => {
        console.log("Node clicked:", customNode); // 👈 Console log here
        if (customNode.id) {
          setDogId(customNode.id); // this triggers modal via useEffect
        }
      }}
        tabIndex={0}
        aria-label={`${customNode.name || "Unknown"} ${customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
          }`}
      >
        <rect
          className="node-rect"
          width={nodeDimensions.width}
          height={nodeDimensions.height}
          x={-nodeDimensions.width / 2}
          y={-nodeDimensions.height / 2}
          rx={8}
          ry={8}
          strokeWidth={1.5}
        />
        <text
          x={0}
          y={-nodeDimensions.height / 6}
          textAnchor="middle"
          fontSize={nodeDimensions.fontSize}
          fontWeight="600"
          stroke="none"
          className="node-text truncate"
          style={{ maxWidth: nodeDimensions.width - 20 }}
        >
          {customNode.name || "Unknown"}
        </text>
        {customNode.accNumber && (
          <text
            x={0}
            y={nodeDimensions.height / 6}
            textAnchor="middle"
            fontSize={nodeDimensions.accFontSize}
            stroke="none"
            className="node-subtext"
          >
            ACC#: {customNode.accNumber}
          </text>
        )}
        <g className="icon" transform={`translate(${nodeDimensions.width / 2 - 18}, ${-nodeDimensions.height / 2 + 10})`}>
          {isMale ? <FaMars size={nodeDimensions.iconSize} /> : <FaVenus size={nodeDimensions.iconSize} />}
        </g>

        {/* when we hover on node this show the generation */}
        {/* {customNode.depth !== undefined && (
          <text
            x={-nodeDimensions.width / 2 + 8}
            y={-nodeDimensions.height / 2 + 12}
            fontSize={nodeDimensions.genFontSize}
            stroke="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Gen {customNode.depth + 1}
          </text>
        )} */}
      </g>
    );
  };

  const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-3 justify-center">
              {[0, 1, 2].map((col) => (
                <Skeleton
                  key={col}
                  variant="rounded"
                  width={nodeDimensions.width}
                  height={nodeDimensions.height}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (!treeData) {
      return (
        <div className="no-data">
          <p className="text-sm mb-1 font-medium">No data for {title}</p>
          <p className="text-xs">This dog's {title} information is not available</p>
        </div>
      );
    }

    return (
      <Tree
        // renderCustomNodeElement={renderRectNode(handleNodeClick)}
        data={treeData}
        orientation={isMobile ? "vertical" : "horizontal"}
        translate={translate}
        renderCustomNodeElement={renderRectNode}
        nodeSize={{
          x: nodeDimensions.width + (isMobile ? 40 : 20),
          y: nodeDimensions.height + (isMobile ? 60 : 30)
        }}
        separation={{
          siblings: isMobile ? 1.2 : 0.9,
          nonSiblings: isMobile ? 1.5 : 1.2
        }}
        pathFunc="step"
        zoomable={false}
        zoom={zoom}
        scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
        transitionDuration={300}
        pathClassFunc={() => "tree-link"}
        collapsible={false}
      />
    );
  };

  const getTreeHeight = (treeData: TreeNodeDatum | null): string => {
    if (!treeData || loading) return isMobile ? "40vh" : "45vh";
    const nodeCount = countNodes(treeData);
    const baseHeight = isMobile ? 25 : 40;
    return `${Math.max(baseHeight, nodeCount * (isMobile ? 12 : 6))}vh`;
  };

  return (
    <Box
      className={isDark ? 'dark' : 'light'}
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: { xs: "0.5rem", sm: "1rem" },
        minHeight: "50vh",
        backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
        color: nodeColors.textPrimary,
        transition: "background-color 0.3s, color 0.3s",
        userSelect: "none",
        position: "relative",
      }}
    >
      <div className="mode-toggle-container">
        <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
          <IconButton
            className="mode-toggle"
            onClick={() => setManualDarkMode(!isDark)}
            aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ?
              <FaSun className="text-yellow-300" size={18} /> :
              <FaMoon className="text-indigo-700" size={18} />
            }
          </IconButton>
        </Tooltip>
      </div>

      <div className="text-center mb-4">
        {loading ? (
          <>
            <Skeleton variant="text" width={200} height={40} sx={{ margin: "0 auto" }} />
            <Skeleton variant="text" width={150} height={20} sx={{ margin: "0.5rem auto" }} />
          </>
        ) : (
          <h1 className="text-2xl font-bold">{dogName}</h1>
        )}
      </div>

      <div
        ref={containerRef}
        style={{
          width: "100'",
          height: "85vh",
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          borderRadius: 12,
          boxShadow: isDark ? "0 6px 12px rgba(0,0,0,0.7)" : "0 6px 16px rgba(0,0,0,0.1)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "0.5rem" : "1rem",
        }}
        className="scrollbar-hide"
      >
        <div
          style={{
            minHeight: getTreeHeight(sireTree),
            padding: isMobile ? "0.3rem 0.4rem" : "0rem 0.5rem",
            borderBottom: `1px solid ${isDark ? "#1e293b" : "#cbd5e1"}`,
            overflow: "hidden"
          }}
        >
          <h2
            className="text-lg font-bold text-center mb-3"
            style={{
              color: nodeColors.male,
              textShadow: isDark ? "0 1px 2px rgba(96, 165, 250, 0.5)" : "none"
            }}
          >
            Sire Pedigree
          </h2>
          {renderTree(sireTree, "Sire Pedigree")}
        </div>
        <div
          style={{
            minHeight: getTreeHeight(damTree),
            padding: isMobile ? "0.3rem 0.4rem" : "0rem 0.5rem",
          }}
        >
          <h2
            className="text-lg font-bold text-center mb-3"
            style={{
              color: nodeColors.female,
              textShadow: isDark ? "0 1px 2px rgba(244, 114, 182, 0.5)" : "none"
            }}
          >
            Dam Pedigree
          </h2>
          {renderTree(damTree, "Dam Pedigree")}
        </div>

        <nav className="zoom-controls" aria-label="Zoom controls">
          <Tooltip title="Zoom In" arrow placement="left">
            <IconButton
              className="zoom-button"
              size="small"
              onClick={zoomIn}
              aria-label="Zoom In"
              disabled={zoom >= MAX_ZOOM}
            >
              <FaPlus size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out" arrow placement="left">
            <IconButton
              className="zoom-button"
              size="small"
              onClick={zoomOut}
              aria-label="Zoom Out"
              disabled={zoom <= MIN_ZOOM}
            >
              <FaMinus size={16} />
            </IconButton>
          </Tooltip>
          <div className="separator" />
          <Tooltip title="Reset Zoom" arrow placement="left">
            <IconButton
              className="zoom-button"
              size="small"
              onClick={resetZoom}
              aria-label="Reset Zoom"
              disabled={zoom === 1}
            >
              <FaRedo size={16} />
            </IconButton>
          </Tooltip>
        </nav>

        {showBackToTop && (
          <button className="back-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <FaArrowUp size={18} />
          </button>
        )}
      </div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert className="error-alert" onClose={() => setError(null)} severity="error">
          <span className="font-medium">{error}</span>
        </Alert>
      </Snackbar>
      {/* Render the dog detail modal */}
      <div>
        {isViewModalOpen && viewDog && (
          <DogDetailsModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            dog={viewDog}
          />
        )}
      </div>
    </Box>

  );
};

export default PedigreeTree;
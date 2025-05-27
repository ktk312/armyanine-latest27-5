import { useEffect, useState } from 'react';
import Tree, { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree';
import axios from 'axios';
import ComponentCard from '../common/ComponentCard';

// Extend the TreeNodeDatum with our custom properties
interface CustomTreeNodeDatum extends TreeNodeDatum {
  __rd3t: {
    id: string;
    depth: number;
    collapsed: boolean;
  };
  accNumber?: string;
  sex?: string;
}

interface DogDetails {
  id: number;
  name: string;
  accNumber?: string;
  sex?: string;
  sireLine?: TreeNodeDatum | null;
  damLine?: TreeNodeDatum | null;
}

const renderRectNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => {
  const customNode = nodeDatum as CustomTreeNodeDatum;
  const fillColor = customNode.sex === 'Male' ? '#e0f2fe' : '#fce7f3'; // Different colors for male/female
  const fontFamily = 'Segoe UI, Arial, sans-serif';

  return (
    <g onClick={toggleNode}>
      <rect
        width="200"
        height="100"
        x="-90"
        y="-40"
        fill={fillColor}
        stroke="#0ea5e9"
        strokeWidth={1.5}
        rx="12"
        ry="12"
        filter="drop-shadow(0 1px 3px rgba(255, 0, 0, 0.1))"
      />
      <text
        x="9"
        y="-10"
        textAnchor="middle"
        // fontWeight="bold"
        fontSize={20}
        fill="#1e3a8a"
        style={{ fontFamily }}
      >
        {customNode.name}
      </text>
      {customNode.accNumber && (
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fill="#0369a1"
          style={{ fontFamily }}
        >
          ACC#: {customNode.accNumber}
        </text>
      )}
      {customNode.attributes?.role && (
        <text
          x="0"
          y="27"
          textAnchor="middle"
          fontSize={13}
          fill="#475569"
          fontStyle="italic"
          style={{ fontFamily }}
        >
          {customNode.attributes.role}
        </text>
      )}
    </g>
  );
};

type DogPedigreeProps = {
  dogId: number;
};

const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
  const [translate] = useState({ x: 500, y: 100 });
  const [dogDetails, setDogDetails] = useState<DogDetails | null>(null);
  const [sireData, setSireData] = useState<TreeNodeDatum | null>(null);
  const [damData, setDamData] = useState<TreeNodeDatum | null>(null);
  // Counter for generating unique IDs
  const [nodeIdCounter, setNodeIdCounter] = useState(0);

  const generateNodeId = () => {
    setNodeIdCounter(prev => prev + 1);
    return `node-${nodeIdCounter}`;
  };

  const transformTree = (node: any, depth = 0): CustomTreeNodeDatum => {
    const id = generateNodeId();
    return {
      name: node.name,
      accNumber: node.accNumber,
      sex: node.sex,
      attributes: {
        role: node.role,
        ...(node.accNumber && { accNumber: node.accNumber }),
        ...(node.sex && { sex: node.sex })
      },
      children: node.children?.map((child: any) => transformTree(child, depth + 1)) || [],
      __rd3t: {
        id,
        depth,
        collapsed: depth > 1 // Collapse nodes deeper than 1 level by default
      }
    };
  };

  useEffect(() => {
    const fetchPedigree = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/dog/pedigree/${dogId}`);

        // Transform the main dog details
        const mainDog = {
          id: response.data.id,
          name: response.data.name,
          accNumber: response.data.accNumber,
          sex: response.data.sex,
        };

        // Extract sire and dam lines from children
        const sireLine = response.data.children.find((child: any) => child.role.includes('Sire'));
        const damLine = response.data.children.find((child: any) => child.role.includes('Dam'));

        setDogDetails(mainDog);
        setSireData(sireLine ? transformTree(sireLine) : null);
        setDamData(damLine ? transformTree(damLine) : null);
      } catch (error) {
        console.error('Failed to fetch pedigree:', error);
      }
    };

    fetchPedigree();
  }, [dogId]);


  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
      <ComponentCard title="">
        <div className="grid grid-cols-1 gap-1 xl:grid-cols-1">

          {/* <div style={{ width: '100%', height: '100vh', padding: '20px' }}> */}
          {/* Main dog details */}
          {dogDetails && (
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>{dogDetails.name}</h2>
              {dogDetails.accNumber && (
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>ACC#: {dogDetails.accNumber}</p>
              )}
              <p style={{ color: '#475569', fontStyle: 'italic' }}>Main Dog</p>
            </div>
          )}

          {/* </div> */}
        </div>
        {/* Sire and Dam trees */}
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}> */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
          {/* Sire lineage */}
          <div style={{ flex: 1 }}>
            <h3 style={{ textAlign: 'center', color: '#1e40af', marginBottom: '20px' }}>Sire Lineage</h3>
            {sireData ? (
              <div style={{ height: '70vh', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px' }}>
                <Tree
                  data={sireData}
                  translate={translate}
                  orientation="horizontal"
                  pathFunc="elbow"
                  zoomable
                  scaleExtent={{ min: 0.5, max: 2 }}
                  enableLegacyTransitions
                  renderCustomNodeElement={renderRectNode}
                  collapsible
                  nodeSize={{ x: 250, y: 180 }}
                  separation={{ siblings: 1.5, nonSiblings: 1.5 }}
                />
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#64748b' }}>No sire information available</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
          {/* Dam lineage */}
          <div style={{ flex: 1 }}>
            <h3 style={{ textAlign: 'center', color: '#831843', marginBottom: '20px' }}>Dam Lineage</h3>
            {damData ? (
              <div style={{ height: '70vh', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px' }}>
                <Tree
                  data={damData}
                  translate={translate}
                  orientation="horizontal"
                  pathFunc="elbow"
                  zoomable
                  scaleExtent={{ min: 0.5, max: 2 }}
                  enableLegacyTransitions
                  renderCustomNodeElement={renderRectNode}
                  collapsible
                  nodeSize={{ x: 250, y: 180 }}
                  separation={{ siblings: 1.5, nonSiblings: 1.5 }}
                />
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#64748b' }}>No dam information available</p>
            )}
          </div>

        </div>
        {/* </div> */}

      </ComponentCard>

    </div>
  );
};

export default PedigreeTree;
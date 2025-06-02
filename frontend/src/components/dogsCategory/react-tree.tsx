// import { useEffect, useState } from 'react';
// import Tree, { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree';
// import axios from 'axios';
// import ComponentCard from '../common/ComponentCard';

// // Extend the TreeNodeDatum with our custom properties
// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   __rd3t: {
//     id: string;
//     depth: number;
//     collapsed: boolean;
//   };
//   accNumber?: string;
//   sex?: string;
// }

// interface DogDetails {
//   id: number;
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   sireLine?: TreeNodeDatum | null;
//   damLine?: TreeNodeDatum | null;
// }

// const renderRectNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const fillColor = customNode.sex === 'Male' ? '#e0f2fe' : '#fce7f3'; // Different colors for male/female
//   const fontFamily = 'Segoe UI, Arial, sans-serif';

//   return (
//     <g onClick={toggleNode}>
//       <rect
//         width="200"
//         height="100"
//         x="-90"
//         y="-40"
//         fill={fillColor}
//         stroke="#0ea5e9"
//         strokeWidth={1.5}
//         rx="12"
//         ry="12"
//         filter="drop-shadow(0 1px 3px rgba(255, 0, 0, 0.1))"
//       />
//       <text
//         x="9"
//         y="-10"
//         textAnchor="middle"
//         // fontWeight="bold"
//         fontSize={20}
//         fill="#1e3a8a"
//         style={{ fontFamily }}
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text
//           x="0"
//           y="10"
//           textAnchor="middle"
//           fill="#0369a1"
//           style={{ fontFamily }}
//         >
//           ACC#: {customNode.accNumber}
//         </text>
//       )}
//       {customNode.attributes?.role && (
//         <text
//           x="0"
//           y="27"
//           textAnchor="middle"
//           fontSize={13}
//           fill="#475569"
//           fontStyle="italic"
//           style={{ fontFamily }}
//         >
//           {customNode.attributes.role}
//         </text>
//       )}
//     </g>
//   );
// };

// type DogPedigreeProps = {
//   dogId: number;
// };

// const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
//   const [translate] = useState({ x: 500, y: 100 });
//   const [dogDetails, setDogDetails] = useState<DogDetails | null>(null);
//   const [sireData, setSireData] = useState<TreeNodeDatum | null>(null);
//   const [damData, setDamData] = useState<TreeNodeDatum | null>(null);
//   // Counter for generating unique IDs
//   const [nodeIdCounter, setNodeIdCounter] = useState(0);

//   const generateNodeId = () => {
//     setNodeIdCounter(prev => prev + 1);
//     return `node-${nodeIdCounter}`;
//   };

//   const transformTree = (node: any, depth = 0): CustomTreeNodeDatum => {
//     const id = generateNodeId();
//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       attributes: {
//         role: node.role,
//         ...(node.accNumber && { accNumber: node.accNumber }),
//         ...(node.sex && { sex: node.sex })
//       },
//       children: node.children?.map((child: any) => transformTree(child, depth + 1)) || [],
//       __rd3t: {
//         id,
//         depth,
//         collapsed: depth > 1 // Collapse nodes deeper than 1 level by default
//       }
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/dog/pedigree/${dogId}`);

//         // Transform the main dog details
//         const mainDog = {
//           id: response.data.id,
//           name: response.data.name,
//           accNumber: response.data.accNumber,
//           sex: response.data.sex,
//         };

//         // Extract sire and dam lines from children
//         const sireLine = response.data.children.find((child: any) => child.role.includes('Sire'));
//         const damLine = response.data.children.find((child: any) => child.role.includes('Dam'));

//         setDogDetails(mainDog);
//         setSireData(sireLine ? transformTree(sireLine) : null);
//         setDamData(damLine ? transformTree(damLine) : null);
//       } catch (error) {
//         console.error('Failed to fetch pedigree:', error);
//       }
//     };

//     fetchPedigree();
//   }, [dogId]);


//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
//       <ComponentCard title="">
//         <div className="grid grid-cols-1 gap-1 xl:grid-cols-1">

//           {/* <div style={{ width: '100%', height: '100vh', padding: '20px' }}> */}
//           {/* Main dog details */}
//           {dogDetails && (
//             <div style={{
//               textAlign: 'center',
//               marginBottom: '40px',
//               padding: '20px',
//               backgroundColor: '#f8fafc',
//               borderRadius: '12px',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//             }}>
//               <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>{dogDetails.name}</h2>
//               {dogDetails.accNumber && (
//                 <p style={{ color: '#0369a1', marginBottom: '8px' }}>ACC#: {dogDetails.accNumber}</p>
//               )}
//               <p style={{ color: '#475569', fontStyle: 'italic' }}>Main Dog</p>
//             </div>
//           )}

//           {/* </div> */}
//         </div>
//         {/* Sire and Dam trees */}
//         {/* <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}> */}
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
//           {/* Sire lineage */}
//           <div style={{ flex: 1 }}>
//             <h3 style={{ textAlign: 'center', color: '#1e40af', marginBottom: '20px' }}>Sire Lineage</h3>
//             {sireData ? (
//               <div style={{ height: '70vh', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px' }}>
//                 <Tree
//                   data={sireData}
//                   translate={translate}
//                   orientation="horizontal"
//                   pathFunc="elbow"
//                   zoomable
//                   scaleExtent={{ min: 0.5, max: 2 }}
//                   enableLegacyTransitions
//                   renderCustomNodeElement={renderRectNode}
//                   collapsible
//                   nodeSize={{ x: 250, y: 180 }}
//                   separation={{ siblings: 1.5, nonSiblings: 1.5 }}
//                 />
//               </div>
//             ) : (
//               <p style={{ textAlign: 'center', color: '#64748b' }}>No sire information available</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
//           {/* Dam lineage */}
//           <div style={{ flex: 1 }}>
//             <h3 style={{ textAlign: 'center', color: '#831843', marginBottom: '20px' }}>Dam Lineage</h3>
//             {damData ? (
//               <div style={{ height: '70vh', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px' }}>
//                 <Tree
//                   data={damData}
//                   translate={translate}
//                   orientation="horizontal"
//                   pathFunc="elbow"
//                   zoomable
//                   scaleExtent={{ min: 0.5, max: 2 }}
//                   enableLegacyTransitions
//                   renderCustomNodeElement={renderRectNode}
//                   collapsible
//                   nodeSize={{ x: 250, y: 180 }}
//                   separation={{ siblings: 1.5, nonSiblings: 1.5 }}
//                 />
//               </div>
//             ) : (
//               <p style={{ textAlign: 'center', color: '#64748b' }}>No dam information available</p>
//             )}
//           </div>

//         </div>
//         {/* </div> */}

//       </ComponentCard>

//     </div>
//   );
// };

// export default PedigreeTree;










// import { useEffect, useState, useRef } from 'react';
// import Tree, { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import ComponentCard from '../common/ComponentCard';
// import { FaMars, FaVenus, FaSpinner, FaFilePdf } from 'react-icons/fa';
// import './styles/Pedigree.css'; // Import custom CSS

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   __rd3t: {
//     id: string;
//     depth: number;
//     collapsed: boolean;
//   };
//   accNumber?: string;
//   sex?: string;
// }

// interface DogDetails {
//   id: number;
//   name: string;
//   accNumber?: string;
//   sex?: string;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   role?: string;
//   children?: ApiNode[];
// }

// const renderRectNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === 'Male';
//   const fillColor = isMale
//     ? 'url(#maleGradient)'
//     : 'url(#femaleGradient)';
//   const fontFamily = 'Inter, Segoe UI, Arial, sans-serif';
//   const width = 220;
//   const height = 120;

//   return (
//     <g
//       onClick={toggleNode}
//       role="button"
//       aria-label={`Node: ${customNode.name}`}
//       className="group transition-transform duration-300 hover:scale-105"
//     >
//       <defs>
//         <linearGradient id="maleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: '#bfdbfe', stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
//         </linearGradient>
//         <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: '#fbcfe8', stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
//         </linearGradient>
//       </defs>
//       <rect
//         width={width}
//         height={height}
//         x={-width / 2}
//         y={-height / 2}
//         fill={fillColor}
//         stroke={isMale ? '#2563eb' : '#db2777'}
//         strokeWidth={2}
//         rx="16"
//         ry="16"
//         className="transition-shadow duration-300 group-hover:shadow-lg"
//       />
//       <text
//         x="0"
//         y={-height / 4}
//         textAnchor="middle"
//         fontSize={22}
//         fontWeight="600"
//         fill="#ffffff"
//         style={{ fontFamily, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
//         aria-hidden="true"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text
//           x="0"
//           y="0"
//           textAnchor="middle"
//           fontSize={14}
//           fill="#ffffff"
//           style={{ fontFamily }}
//           aria-hidden="true"
//         >
//           ACC#: {customNode.accNumber}
//         </text>
//       )}
//       {customNode.attributes?.role && (
//         <text
//           x="0"
//           y={height / 4}
//           textAnchor="middle"
//           fontSize={12}
//           fill="#ffffff"
//           fontStyle="italic"
//           style={{ fontFamily }}
//           aria-hidden="true"
//         >
//           {customNode.attributes.role}
//         </text>
//       )}
//       <g transform={`translate(${width / 2 - 30}, ${-height / 2 + 10})`}>
//         {isMale ? (
//           <FaMars size={20} color="#ffffff" aria-label="Male" />
//         ) : (
//           <FaVenus size={20} color="#ffffff" aria-label="Female" />
//         )}
//       </g>
//     </g>
//   );
// };

// type DogPedigreeProps = {
//   dogId: number;
// };

// const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
//   const treeContainerRef = useRef<HTMLDivElement>(null);
//   const componentRef = useRef<HTMLDivElement>(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [dogDetails, setDogDetails] = useState<DogDetails | null>(null);
//   const [sireData, setSireData] = useState<TreeNodeDatum | null>(null);
//   const [damData, setDamData] = useState<TreeNodeDatum | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (treeContainerRef.current) {
//       const { width, height } = treeContainerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 2, y: height / 4 });
//     }
//   }, [sireData, damData]);

//   const transformTree = (node: ApiNode, depth = 0, counterRef: { current: number }): CustomTreeNodeDatum => {
//     const id = `node-${counterRef.current++}`;
//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       attributes: {
//         role: node.role || "",
//         ...(node.accNumber && { accNumber: node.accNumber }),
//         ...(node.sex && { sex: node.sex }),
//       },
//       children: node.children?.map((child) => transformTree(child, depth + 1, counterRef)) || [],
//       __rd3t: {
//         id,
//         depth,
//         collapsed: depth > 1,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       setIsLoading(true);
//       try {
//         const API_URL = 'http://localhost:3000';
//         const response = await axios.get(`${API_URL}/api/dog/pedigree/${dogId}`);
//         const mainDog = {
//           id: response.data.id,
//           name: response.data.name,
//           accNumber: response.data.accNumber,
//           sex: response.data.sex,
//         };
//         const sireLine = response.data.children?.find((child: ApiNode) => child.role?.includes('Sire'));
//         const damLine = response.data.children?.find((child: ApiNode) => child.role?.includes('Dam'));
//         const counterRef = { current: 0 };
//         setDogDetails(mainDog);
//         setSireData(sireLine ? transformTree(sireLine, 0, counterRef) : null);
//         setDamData(damLine ? transformTree(damLine, 0, counterRef) : null);
//         setError(null);
//       } catch (error) {
//         console.error('Failed to fetch pedigree:', error);
//         setError('Failed to load pedigree data. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   const handleExportPdf = async () => {
//     if (!componentRef.current) return;
//     try {
//       setIsLoading(true);
//       const canvas = await html2canvas(componentRef.current, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: '#ffffff',
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 190;
//       const pageHeight = 297;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 10;

//       pdf.setFontSize(16);
//       pdf.text(`Pedigree of ${dogDetails?.name || 'Dog'}`, 10, 10);
//       position += 10;

//       pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight - 20;

//       while (heightLeft > 0) {
//         pdf.addPage();
//         position = heightLeft - imgHeight + 10;
//         pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight - 20;
//       }

//       pdf.save(`pedigree_${dogId}.pdf`);
//       setError(null);
//     } catch (error) {
//       console.error('Failed to export PDF:', error);
//       setError('Failed to export PDF. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="pedigree-container">
//       <ComponentCard title="Pedigree Tree" className="pedigree-card">
//         <div className="export-button-container">
//           <button
//             onClick={handleExportPdf}
//             className="export-button"
//             disabled={isLoading || !dogDetails}
//           >
//             <FaFilePdf className="export-icon" />
//             Export to PDF
//           </button>
//         </div>
//         <div ref={componentRef}>
//           {isLoading && (
//             <div className="loading-container">
//               <FaSpinner className="loading-spinner" />
//               <span className="loading-text">Loading pedigree...</span>
//             </div>
//           )}
//           {error && (
//             <div className="error-container">
//               <p className="error-text">{error}</p>
//               <button
//                 onClick={() => {
//                   setError(null);
//                   setIsLoading(true);
//                   setSireData(null);
//                   setDamData(null);
//                   setDogDetails(null);
//                 }}
//                 className="retry-button"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//           {dogDetails && (
//             <div className="main-dog-card">
//               <h2 className="main-dog-title">{dogDetails.name}</h2>
//               {dogDetails.accNumber && (
//                 <p className="main-dog-acc">ACC#: {dogDetails.accNumber}</p>
//               )}
//               <p className="main-dog-label">Main Dog</p>
//               {dogDetails.sex && (
//                 <div className="main-dog-sex">
//                   {dogDetails.sex === 'Male' ? (
//                     <FaMars className="sex-icon male" aria-label="Male" />
//                   ) : (
//                     <FaVenus className="sex-icon female" aria-label="Female" />
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="lineage-container">
//             {/* Sire lineage */}
//             <div className="lineage-section">
//               <h3 className="lineage-title sire">Sire Lineage</h3>
//               {sireData ? (
//                 <div
//                   ref={treeContainerRef}
//                   className="tree-container"
//                 >
//                   <Tree
//                     data={sireData}
//                     translate={translate}
//                     orientation="horizontal"
//                     pathFunc="elbow"
//                     zoomable
//                     scaleExtent={{ min: 0.5, max: 2 }}
//                     enableLegacyTransitions
//                     renderCustomNodeElement={renderRectNode}
//                     collapsible
//                     nodeSize={{ x: 260, y: 200 }}
//                     separation={{ siblings: 1.5, nonSiblings: 1.5 }}
//                     pathClassFunc={() => 'stroke-indigo-400 dark:stroke-indigo-200 stroke-2'}
//                   />
//                 </div>
//               ) : (
//                 <p className="no-data-text">No sire information available</p>
//               )}
//             </div>
//             {/* Dam lineage */}
//             <div className="lineage-section">
//               <h3 className="lineage-title dam">Dam Lineage</h3>
//               {damData ? (
//                 <div
//                   className="tree-container"
//                 >
//                   <Tree
//                     data={damData}
//                     translate={translate}
//                     orientation="horizontal"
//                     pathFunc="elbow"
//                     zoomable
//                     scaleExtent={{ min: 0.5, max: 2 }}
//                     enableLegacyTransitions
//                     renderCustomNodeElement={renderRectNode}
//                     collapsible
//                     nodeSize={{ x: 260, y: 200 }}
//                     separation={{ siblings: 1.5, nonSiblings: 1.5 }}
//                     pathClassFunc={() => 'stroke-pink-400 dark:stroke-pink-200 stroke-2'}
//                   />
//                 </div>
//               ) : (
//                 <p className="no-data-text">No dam information available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </ComponentCard>
//     </div>
//   );
// };

// export default PedigreeTree;


// import { useEffect, useState, useRef } from 'react';
// import Tree, { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import ComponentCard from '../common/ComponentCard';
// import { FaMars, FaVenus, FaSpinner, FaFilePdf } from 'react-icons/fa';
// import './styles/Pedigree.css'; // Import custom CSS
// import { BASE_URL } from '../../config/constant';

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   __rd3t: {
//     id: string;
//     depth: number;
//     collapsed: boolean;
//   };
//   accNumber?: string;
//   sex?: string;
// }

// interface DogDetails {
//   id: number;
//   name: string;
//   accNumber?: string;
//   sex?: string;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   role?: string;
//   children?: ApiNode[];
// }

// const renderRectNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === 'Male';
//   const fillColor = isMale ? 'url(#maleGradient)' : 'url(#femaleGradient)';
//   const fontFamily = 'Inter, Segoe UI, Arial, sans-serif';
//   const width = 300; // Increased node width (from 220 to 300)
//   const height = 120;

//   return (
//     <g
//       onClick={toggleNode}
//       role="button"
//       aria-label={`Node: ${customNode.name}`}
//       className="group transition-transform duration-300 hover:scale-105"
//     >
//       <defs>
//         <linearGradient id="maleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: '#bfdbfe', stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
//         </linearGradient>
//         <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: '#fbcfe8', stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
//         </linearGradient>
//       </defs>
//       <rect
//         width={width}
//         height={height}
//         x={-width / 2}
//         y={-height / 2}
//         fill={fillColor}
//         stroke={isMale ? '#2563eb' : '#db2777'}
//         strokeWidth={2}
//         rx="16"
//         ry="16"
//         className="transition-shadow duration-300 group-hover:shadow-lg"
//       />
//       <text
//         x="0"
//         y={-height / 4}
//         textAnchor="middle"
//         fontSize={22}
//         fontWeight="600"
//         fill="#ffffff"
//         style={{ fontFamily, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
//         aria-hidden="true"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text
//           x="0"
//           y="0"
//           textAnchor="middle"
//           fontSize={14}
//           fill="#ffffff"
//           style={{ fontFamily }}
//           aria-hidden="true"
//         >
//           ACC#: {customNode.accNumber}
//         </text>
//       )}
//       {customNode.attributes?.role && (
//         <text
//           x="0"
//           y={height / 4}
//           textAnchor="middle"
//           fontSize={12}
//           fill="#ffffff"
//           fontStyle="italic"
//           style={{ fontFamily }}
//           aria-hidden="true"
//         >
//           {customNode.attributes.role}
//         </text>
//       )}
//       <g transform={`translate(${width / 2 - 30}, ${-height / 2 + 10})`}>
//         {isMale ? (
//           <FaMars size={20} color="#ffffff" aria-label="Male" />
//         ) : (
//           <FaVenus size={20} color="#ffffff" aria-label="Female" />
//         )}
//       </g>
//     </g>
//   );
// };

// type DogPedigreeProps = {
//   dogId: number;
// };

// const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
//   const treeContainerRef = useRef<HTMLDivElement>(null);
//   const componentRef = useRef<HTMLDivElement>(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [dogDetails, setDogDetails] = useState<DogDetails | null>(null);
//   const [sireData, setSireData] = useState<TreeNodeDatum | null>(null);
//   const [damData, setDamData] = useState<TreeNodeDatum | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Calculate maximum depth of the tree for dynamic height
//   const getTreeDepth = (node: TreeNodeDatum | null): number => {
//     if (!node || !node.children) return 0;
//     return 1 + Math.max(...node.children.map(getTreeDepth));
//   };

//   useEffect(() => {
//     if (treeContainerRef.current) {
//       const { width, height } = treeContainerRef.current.getBoundingClientRect();
//       const sireDepth = sireData ? getTreeDepth(sireData) : 0;
//       const damDepth = damData ? getTreeDepth(damData) : 0;
//       const maxDepth = Math.max(sireDepth, damDepth);
//       const dynamicHeight = Math.max(400, maxDepth * 250); // Minimum 400px, 250px per level
//       setTranslate({ x: width / 2, y: dynamicHeight / 4 });
//     }
//   }, [sireData, damData]);

//   const transformTree = (node: ApiNode, depth = 0, counterRef: { current: number }): CustomTreeNodeDatum => {
//     const id = `node-${counterRef.current++}`;
//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       attributes: {
//         role: node.role || "",
//         ...(node.accNumber && { accNumber: node.accNumber }),
//         ...(node.sex && { sex: node.sex }),
//       },
//       children: node.children?.map((child) => transformTree(child, depth + 1, counterRef)) || [],
//       __rd3t: {
//         id,
//         depth,
//         collapsed: false, // Ensure all nodes are expanded by default
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       setIsLoading(true);
//       try {
//         // const API_URL = 'http://localhost:3000';
//         const response = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const mainDog = {
//           id: response.data.id,
//           name: response.data.name,
//           accNumber: response.data.accNumber,
//           sex: response.data.sex,
//         };
//         const sireLine = response.data.children?.find((child: ApiNode) => child.role?.includes('Sire'));
//         const damLine = response.data.children?.find((child: ApiNode) => child.role?.includes('Dam'));
//         const counterRef = { current: 0 };
//         setDogDetails(mainDog);
//         setSireData(sireLine ? transformTree(sireLine, 0, counterRef) : null);
//         setDamData(damLine ? transformTree(damLine, 0, counterRef) : null);
//         setError(null);
//       } catch (error) {
//         console.error('Failed to fetch pedigree:', error);
//         setError('Failed to load pedigree data. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   const handleExportPdf = async () => {
//     if (!componentRef.current) return;
//     try {
//       setIsLoading(true);
//       const canvas = await html2canvas(componentRef.current, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: '#ffffff',
//         windowWidth: document.documentElement.scrollWidth, // Capture full width
//         windowHeight: document.documentElement.scrollHeight, // Capture full height
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 190;
//       const pageHeight = 297;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 10;

//       pdf.setFontSize(16);
//       pdf.text(`Pedigree of ${dogDetails?.name || 'Dog'}`, 10, 10);
//       position += 10;

//       pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight - 20;

//       while (heightLeft > 0) {
//         pdf.addPage();
//         position = heightLeft - imgHeight + 10;
//         pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight - 20;
//       }

//       pdf.save(`pedigree_${dogId}.pdf`);
//       setError(null);
//     } catch (error) {
//       console.error('Failed to export PDF:', error);
//       setError('Failed to export PDF. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="pedigree-container">
//       <ComponentCard title="Pedigree Tree" className="pedigree-card">
//         <div className="export-button-container">
//           <button
//             onClick={handleExportPdf}
//             className="export-button"
//             disabled={isLoading || !dogDetails}
//           >
//             <FaFilePdf className="export-icon" />
//             Export to PDF
//           </button>
//         </div>
//         <div ref={componentRef}>
//           {isLoading && (
//             <div className="loading-container">
//               <FaSpinner className="loading-spinner" />
//               <span className="loading-text">Loading pedigree...</span>
//             </div>
//           )}
//           {error && (
//             <div className="error-container">
//               <p className="error-text">{error}</p>
//               <button
//                 onClick={() => {
//                   setError(null);
//                   setIsLoading(true);
//                   setSireData(null);
//                   setDamData(null);
//                   setDogDetails(null);
//                 }}
//                 className="retry-button"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//           {dogDetails && (
//             <div className="main-dog-card">
//               <h2 className="main-dog-title">{dogDetails.name}</h2>
//               {dogDetails.accNumber && (
//                 <p className="main-dog-acc">ACC#: {dogDetails.accNumber}</p>
//               )}
//               <p className="main-dog-label">Main Dog</p>
//               {dogDetails.sex && (
//                 <div className="main-dog-sex">
//                   {dogDetails.sex === 'Male' ? (
//                     <FaMars className="sex-icon male" aria-label="Male" />
//                   ) : (
//                     <FaVenus className="sex-icon female" aria-label="Female" />
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="lineage-container">
//             {/* Sire lineage */}
//             <div className="lineage-section">
//               <h3 className="lineage-title sire">Sire Lineage</h3>
//               {sireData ? (
//                 <div
//                   ref={treeContainerRef}
//                   className="tree-container"
//                   style={{ minHeight: `${Math.max(400, getTreeDepth(sireData) * 250)}px` }}
//                 >
//                   <Tree
//                     data={sireData}
//                     translate={translate}
//                     orientation="horizontal"
//                     pathFunc="elbow"
//                     zoomable
//                     scaleExtent={{ min: 0.5, max: 2 }}
//                     enableLegacyTransitions
//                     renderCustomNodeElement={renderRectNode}
//                     collapsible
//                     nodeSize={{ x: 350, y: 200 }} // Increased x to accommodate wider nodes
//                     separation={{ siblings: 1.2, nonSiblings: 1.2 }} // Adjusted separation
//                     pathClassFunc={() => 'stroke-indigo-400 dark:stroke-indigo-200 stroke-2'}
//                   />
//                 </div>
//               ) : (
//                 <p className="no-data-text">No sire information available</p>
//               )}
//             </div>
//             {/* Dam lineage */}
//             <div className="lineage-section">
//               <h3 className="lineage-title dam">Dam Lineage</h3>
//               {damData ? (
//                 <div
//                   className="tree-container"
//                   style={{ minHeight: `${Math.max(400, getTreeDepth(damData) * 250)}px` }}
//                 >
//                   <Tree
//                     data={damData}
//                     translate={translate}
//                     orientation="horizontal"
//                     pathFunc="elbow"
//                     zoomable
//                     scaleExtent={{ min: 0.5, max: 2 }}
//                     enableLegacyTransitions
//                     renderCustomNodeElement={renderRectNode}
//                     collapsible
//                     nodeSize={{ x: 350, y: 200 }} // Increased x to accommodate wider nodes
//                     separation={{ siblings: 1.2, nonSiblings: 1.2 }} // Adjusted separation
//                     pathClassFunc={() => 'stroke-pink-400 dark:stroke-pink-200 stroke-2'}
//                   />
//                 </div>
//               ) : (
//                 <p className="no-data-text">No dam information available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </ComponentCard>
//     </div>
//   );
// };

// export default PedigreeTree;


//shamim

// import { useEffect, useRef, useState } from 'react';
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from 'react-d3-tree';
// import axios from 'axios';
// import { FaMars, FaVenus } from 'react-icons/fa';
// import { BASE_URL } from '../../config/constant';
// import './styles/Pedigree.css';

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === 'Male';
//   const iconColor = isMale ? '#2563eb' : '#db2777';
//   const hoverClass = isMale ? 'male-hover' : 'female-hover';

//   return (
//     <g className={`custom-node ${hoverClass}`}>
//       <rect
//         width={220}
//         height={80}
//         x={-110}
//         y={-40}
//         rx={10}
//         ry={10}
//         className="node-box"
//       />
//       <text
//         x={0}
//         y={-8}
//         textAnchor="middle"
//         fontSize="16"
//         fontWeight="600"
//         fill="#1f2937"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text x={0} y={14} textAnchor="middle" fontSize="13" fill="#4b5563">
//           ACC#: {customNode.accNumber}
//         </text>
//       )}
//       <g transform="translate(85, -30)">
//         {isMale ? (
//           <FaMars size={16} color={iconColor} />
//         ) : (
//           <FaVenus size={16} color={iconColor} />
//         )}
//       </g>
//     </g>
//   );
// };

// type DogPedigreeProps = {
//   dogId: number;
// };

// const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [treeData, setTreeData] = useState<TreeNodeDatum | null>(null);

//   const transformTree = (node: ApiNode): CustomTreeNodeDatum => ({
//     name: node.name,
//     accNumber: node.accNumber,
//     sex: node.sex,
//     children: node.children?.map(transformTree),
//     __rd3t: {
//       id: '',
//       depth: 0,
//       collapsed: false
//     }
//   });

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const root: ApiNode = {
//           name: data.name,
//           accNumber: data.accNumber,
//           sex: data.sex,
//           children: data.children,
//         };
//         setTreeData(transformTree(root));
//       } catch (err) {
//         console.error('Error loading pedigree data:', err);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current && treeData) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: 100, y: height / 2 });
//     }
//   }, [treeData]);

//   return (
//     <div
//       ref={containerRef}
//       className="tree-container w-full h-[80vh] px-2 py-4 bg-white rounded-lg shadow"
//     >
//       {treeData ? (
//         <Tree
//           data={treeData}
//           orientation="horizontal"
//           translate={translate}
//           renderCustomNodeElement={renderRectNode}
//           nodeSize={{ x: 260, y: 120 }}
//           separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//           pathFunc="step"
//           zoomable
//           scaleExtent={{ min: 0.4, max: 2 }}
//         />
//       ) : (
//         <p className="text-center text-gray-500">Loading pedigree tree...</p>
//       )}
//     </div>
//   );
// };

// export default PedigreeTree;



//shamim-changes 2

import { useEffect, useRef, useState } from 'react';
import Tree, { TreeNodeDatum, CustomNodeElementProps } from 'react-d3-tree';
import axios from 'axios';
import { FaMars, FaVenus } from 'react-icons/fa';
import { BASE_URL } from '../../config/constant';
import './styles/Pedigree.css';

interface CustomTreeNodeDatum extends TreeNodeDatum {
  accNumber?: string;
  sex?: string;
}

interface ApiNode {
  name: string;
  accNumber?: string;
  sex?: string;
  children?: ApiNode[];
}

const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
  const customNode = nodeDatum as CustomTreeNodeDatum;
  const isMale = customNode.sex === 'Male';
  const iconColor = isMale ? '#2563eb' : '#db2777';
  const hoverClass = isMale ? 'male-hover' : 'female-hover';

  return (
    <g className={`custom-node ${hoverClass}`}>
      <rect
        width={220}
        height={80}
        x={-110}
        y={-40}
        rx={10}
        ry={10}
        className="node-box"
      />
      <text
        x={0}
        y={-8}
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill="#1f2937"
      >
        {customNode.name}
      </text>
      {customNode.accNumber && (
        <text x={0} y={14} textAnchor="middle" fontSize="13" fill="#4b5563">
          ACC#: {customNode.accNumber}
        </text>
      )}
      <g transform="translate(85, -30)">
        {isMale ? (
          <FaMars size={16} color={iconColor} />
        ) : (
          <FaVenus size={16} color={iconColor} />
        )}
      </g>
    </g>
  );
};

type DogPedigreeProps = {
  dogId: number;
};

const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
  const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
  const [activeTab, setActiveTab] = useState<'sire' | 'dam'>('sire');

  // Transform API node to TreeNodeDatum type for react-d3-tree
  const transformTree = (node: ApiNode): CustomTreeNodeDatum => ({
    name: node.name,
    accNumber: node.accNumber,
    sex: node.sex,
    children: node.children?.map(transformTree),
    __rd3t: {
      id: '',
      depth: 0,
      collapsed: false
    }
  });

  useEffect(() => {
    const fetchPedigree = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);

        // data.children assumed to have [sire, dam]
        const sireNode = data.children && data.children[0] ? data.children[0] : null;
        const damNode = data.children && data.children[1] ? data.children[1] : null;

        setSireTree(sireNode ? transformTree(sireNode) : null);
        setDamTree(damNode ? transformTree(damNode) : null);
      } catch (err) {
        console.error('Error loading pedigree data:', err);
      }
    };
    fetchPedigree();
  }, [dogId]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: 100, y: height / 2 });
    }
  }, [sireTree, damTree]);

  const renderTree = () => {
    const dataToRender = activeTab === 'sire' ? sireTree : damTree;
    if (!dataToRender)
      return <p className="text-center text-gray-500">No data available for {activeTab} lineage.</p>;

    return (
      <Tree
        data={dataToRender}
        orientation="horizontal"
        translate={translate}
        renderCustomNodeElement={renderRectNode}
        nodeSize={{ x: 260, y: 120 }}
        separation={{ siblings: 1.2, nonSiblings: 1.8 }}
        pathFunc="step"
        zoomable = {false}
        scaleExtent={{ min: 0.4, max: 2 }}
      />
    );
  };

  return (
    <div className="pedigree-container">
      <div className="tabs-container mb-4 flex justify-center gap-4">
        <button
          className={`tab-button px-4 py-2 rounded ${
            activeTab === 'sire' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('sire')}
        >
          Sire Lineage
        </button>
        <button
          className={`tab-button px-4 py-2 rounded ${
            activeTab === 'dam' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('dam')}
        >
          Dam Lineage
        </button>
      </div>

      <div
        ref={containerRef}
        className="tree-container w-full h-[80vh] px-2 py-4 bg-white rounded-lg shadow"
      >
        {renderTree()}
      </div>
    </div>
  );
};

export default PedigreeTree;

//shamim changes 3

// import React, { useEffect, useRef, useState } from 'react';
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from 'react-d3-tree';
// import axios from 'axios';
// import { FaMars, FaVenus } from 'react-icons/fa';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { BASE_URL } from '../../config/constant';
// import './styles/Pedigree.css';

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   __rd3t: { id: string; depth: number; collapsed: boolean };
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const renderRectNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === 'Male';
//   const iconColor = isMale ? '#2563eb' : '#db2777';
//   const hoverClass = isMale ? 'male-hover' : 'female-hover';

//   return (
//     <g
//       className={`custom-node ${hoverClass}`}
//       style={{ cursor: 'pointer' }}
//       onClick={toggleNode}
//     >
//       <rect
//         width={220}
//         height={80}
//         x={-110}
//         y={-40}
//         rx={10}
//         ry={10}
//         className="node-box"
//       />
//       <text
//         x={0}
//         y={-8}
//         textAnchor="middle"
//         fontSize="16"
//         fontWeight="600"
//         fill="#1f2937"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text x={0} y={14} textAnchor="middle" fontSize="13" fill="#4b5563">
//           ACC#: {customNode.accNumber}
//         </text>
//       )}
//       <g transform="translate(85, -30)">
//         {isMale ? (
//           <FaMars size={16} color={iconColor} />
//         ) : (
//           <FaVenus size={16} color={iconColor} />
//         )}
//       </g>
//     </g>
//   );
// };

// type DogPedigreeProps = {
//   dogId: number;
// };

// const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const treeWrapperRef = useRef<HTMLDivElement>(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [sireTree, setSireTree] = useState<CustomTreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<CustomTreeNodeDatum | null>(null);
//   const [activeTab, setActiveTab] = useState<'sire' | 'dam'>('sire');
//   const [isLoading, setIsLoading] = useState(true);
//   const [animateTab, setAnimateTab] = useState(false);

//   // Transform API node to TreeNodeDatum type for react-d3-tree
//   const transformTree = (node: ApiNode): CustomTreeNodeDatum => ({
//     name: node.name,
//     accNumber: node.accNumber,
//     sex: node.sex,
//     children: node.children?.map(transformTree),
//     __rd3t: {
//       collapsed: false,
//       id: '',
//       depth: 0
//     },
//   });

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);

//         // data.children assumed to have [sire, dam]
//         const sireNode = data.children && data.children[0] ? data.children[0] : null;
//         const damNode = data.children && data.children[1] ? data.children[1] : null;

//         setSireTree(sireNode ? transformTree(sireNode) : null);
//         setDamTree(damNode ? transformTree(damNode) : null);
//       } catch (err) {
//         console.error('Error loading pedigree data:', err);
//         setSireTree(null);
//         setDamTree(null);
//       }
//       setIsLoading(false);
//     };
//     fetchPedigree();
//   }, [dogId]);

//   // Automatically center tree horizontally & vertically and resize on window resize
//   const updateTranslate = () => {
//     if (containerRef.current && treeWrapperRef.current) {
//       const containerBounds = containerRef.current.getBoundingClientRect();
//       const treeBounds = treeWrapperRef.current.getBoundingClientRect();

//       const x = 100; // some left padding
//       const y = containerBounds.height / 2; // vertical center

//       setTranslate({ x, y });
//     }
//   };

//   useEffect(() => {
//     updateTranslate();
//     window.addEventListener('resize', updateTranslate);
//     return () => window.removeEventListener('resize', updateTranslate);
//   }, [sireTree, damTree]);

//   // Animate tab switching
//   const handleTabClick = (tab: 'sire' | 'dam') => {
//     if (tab === activeTab) return;
//     setAnimateTab(true);
//     setTimeout(() => {
//       setActiveTab(tab);
//       setAnimateTab(false);
//     }, 300); // duration of animation
//   };

//   // Export current tree container as PNG image
//   const exportAsPNG = async () => {
//     if (!treeWrapperRef.current) return;

//     const canvas = await html2canvas(treeWrapperRef.current, {
//       backgroundColor: null,
//       scale: 2,
//       scrollY: -window.scrollY, // fix for scroll
//     });
//     canvas.toBlob((blob) => {
//       if (blob) saveAs(blob, `${activeTab}-lineage.png`);
//     });
//   };

//   // Export current tree container as PDF
//   const exportAsPDF = async () => {
//     if (!treeWrapperRef.current) return;

//     const canvas = await html2canvas(treeWrapperRef.current, {
//       backgroundColor: null,
//       scale: 2,
//       scrollY: -window.scrollY,
//     });
//     const imgData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF({
//       orientation: 'landscape',
//       unit: 'pt',
//       format: [canvas.width, canvas.height],
//     });
//     pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//     pdf.save(`${activeTab}-lineage.pdf`);
//   };

//   const dataToRender = activeTab === 'sire' ? sireTree : damTree;

//   return (
//     <div className="pedigree-container max-w-full mx-auto p-4">
//       {/* Tabs with animated switching */}
//       <div className="tabs-container mb-6 flex justify-center gap-4">
//         <button
//           className={`tab-button px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
//             activeTab === 'sire'
//               ? 'bg-blue-600 text-white shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
//           }`}
//           onClick={() => handleTabClick('sire')}
//           disabled={animateTab}
//         >
//           Sire Lineage
//         </button>
//         <button
//           className={`tab-button px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
//             activeTab === 'dam'
//               ? 'bg-pink-600 text-white shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
//           }`}
//           onClick={() => handleTabClick('dam')}
//           disabled={animateTab}
//         >
//           Dam Lineage
//         </button>
//       </div>

//       {/* Export buttons */}
//       <div className="export-buttons mb-4 flex justify-center gap-4">
//         <button
//           onClick={exportAsPNG}
//           className="export-btn px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//           disabled={isLoading || !dataToRender}
//           title="Export current tree as PNG"
//         >
//           Export PNG
//         </button>
//         <button
//           onClick={exportAsPDF}
//           className="export-btn px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//           disabled={isLoading || !dataToRender}
//           title="Export current tree as PDF"
//         >
//           Export PDF
//         </button>
//       </div>

//       {/* Tree container with fade animation on tab switch */}
//       <div
//         ref={containerRef}
//         className={`tree-container w-full h-[75vh] bg-white rounded-lg shadow p-4 relative overflow-auto ${
//           animateTab ? 'fade-out' : 'fade-in'
//         }`}
//         style={{ transition: 'opacity 0.3s ease' }}
//       >
//         {isLoading && (
//           <p className="text-center text-gray-500">Loading pedigree tree...</p>
//         )}
//         {!isLoading && !dataToRender && (
//           <p className="text-center text-gray-500">
//             No data available for {activeTab} lineage.
//           </p>
//         )}
//         {!isLoading && dataToRender && (
//           <div
//             ref={treeWrapperRef}
//             style={{ width: '100%', height: '100%' }}
//             className="tree-wrapper"
//           >
//             <Tree
//               data={dataToRender}
//               orientation="horizontal"
//               translate={translate}
//               renderCustomNodeElement={renderRectNode}
//               nodeSize={{ x: 260, y: 120 }}
//               separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//               pathFunc="step"
//               zoomable={false} // disable zoom
//               draggable={false} // disable drag
//               collapsible // enable collapsible nodes
//               initialDepth={2} // collapse nodes after depth 2
//               scaleExtent={{ min: 1, max: 1 }} // fix zoom level exactly to 1 (no zoom)
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PedigreeTree;

// //shamim changes 4

// import React, { useEffect, useRef, useState } from 'react';
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from 'react-d3-tree';
// import axios from 'axios';
// import { FaMars, FaVenus } from 'react-icons/fa';
// import { BASE_URL } from '../../config/constant';
// import './styles/Pedigree.css';

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   __rd3t: { id: string; depth: number; collapsed: boolean };
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const renderRectNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === 'Male';
//   const iconColor = isMale ? '#2563eb' : '#db2777';
//   const hoverClass = isMale ? 'male-hover' : 'female-hover';

//   return (
//     <g
//       className={`custom-node ${hoverClass}`}
//       style={{ cursor: 'pointer' }}
//       onClick={toggleNode}
//     >
//       <rect
//         width={220}
//         height={80}
//         x={-110}
//         y={-40}
//         rx={10}
//         ry={10}
//         className="node-box"
//       />
//       <text
//         x={0}
//         y={-8}
//         textAnchor="middle"
//         fontSize="16"
//         fontWeight="600"
//         fill="#1f2937"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text x={0} y={14} textAnchor="middle" fontSize="13" fill="#4b5563">
//           ACC#: {customNode.accNumber}
//         </text>
//       )}
//       <g transform="translate(85, -30)">
//         {isMale ? (
//           <FaMars size={16} color={iconColor} />
//         ) : (
//           <FaVenus size={16} color={iconColor} />
//         )}
//       </g>
//     </g>
//   );
// };

// type DogPedigreeProps = {
//   dogId: number;
// };

// const PedigreeTree: React.FC<DogPedigreeProps> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const treeWrapperRef = useRef<HTMLDivElement>(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [sireTree, setSireTree] = useState<CustomTreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<CustomTreeNodeDatum | null>(null);
//   const [activeTab, setActiveTab] = useState<'sire' | 'dam'>('sire');
//   const [isLoading, setIsLoading] = useState(true);
//   const [animateTab, setAnimateTab] = useState(false);

//   // Transform API node to TreeNodeDatum type for react-d3-tree
//   const transformTree = (node: ApiNode): CustomTreeNodeDatum => ({
//     name: node.name,
//     accNumber: node.accNumber,
//     sex: node.sex,
//     children: node.children?.map(transformTree),
//     __rd3t: {
//       collapsed: false,
//       id: '',
//       depth: 0
//     },
//   });

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);

//         // data.children assumed to have [sire, dam]
//         const sireNode = data.children && data.children[0] ? data.children[0] : null;
//         const damNode = data.children && data.children[1] ? data.children[1] : null;

//         setSireTree(sireNode ? transformTree(sireNode) : null);
//         setDamTree(damNode ? transformTree(damNode) : null);
//       } catch (err) {
//         console.error('Error loading pedigree data:', err);
//         setSireTree(null);
//         setDamTree(null);
//       }
//       setIsLoading(false);
//     };
//     fetchPedigree();
//   }, [dogId]);

//   // Automatically center tree horizontally & vertically and resize on window resize
//   const updateTranslate = () => {
//     if (containerRef.current && treeWrapperRef.current) {
//       const containerBounds = containerRef.current.getBoundingClientRect();
//       const treeBounds = treeWrapperRef.current.getBoundingClientRect();

//       const x = containerBounds.width / 2; // center horizontally
//       const y = containerBounds.height / 2; // center vertically

//       setTranslate({ x, y });
//     }
//   };

//   useEffect(() => {
//     updateTranslate();
//     window.addEventListener('resize', updateTranslate);
//     return () => window.removeEventListener('resize', updateTranslate);
//   }, [sireTree, damTree]);

//   // Animate tab switching
//   const handleTabClick = (tab: 'sire' | 'dam') => {
//     if (tab === activeTab) return;
//     setAnimateTab(true);
//     setTimeout(() => {
//       setActiveTab(tab);
//       setAnimateTab(false);
//     }, 300); // duration of animation
//   };

//   const dataToRender = activeTab === 'sire' ? sireTree : damTree;

//   return (
//     <div className="pedigree-container max-w-7xl mx-auto p-8">
//       {/* Tabs with animated switching */}
//       <div className="tabs-container mb-6 flex justify-center gap-4">
//         <button
//           className={`tab-button px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
//             activeTab === 'sire'
//               ? 'bg-blue-600 text-white shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
//           }`}
//           onClick={() => handleTabClick('sire')}
//           disabled={animateTab}
//         >
//           Sire Lineage
//         </button>
//         <button
//           className={`tab-button px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
//             activeTab === 'dam'
//               ? 'bg-pink-600 text-white shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
//           }`}
//           onClick={() => handleTabClick('dam')}
//           disabled={animateTab}
//         >
//           Dam Lineage
//         </button>
//       </div>

//       {/* Tree container with fade animation on tab switch */}
//       <div
//         ref={containerRef}
//         className={`tree-container w-full h-[80vh] bg-white rounded-lg shadow-lg p-6 m-4 relative overflow-auto ${
//           animateTab ? 'fade-out' : 'fade-in'
//         }`}
//         style={{ transition: 'opacity 0.3s ease' }}
//       >
//         {isLoading && (
//           <p className="text-center text-gray-500">Loading pedigree tree...</p>
//         )}
//         {!isLoading && !dataToRender && (
//           <p className="text-center text-gray-500">
//             No data available for {activeTab} lineage.
//           </p>
//         )}
//         {!isLoading && dataToRender && (
//           <div
//             ref={treeWrapperRef}
//             style={{ width: '100%', height: '100%' }}
//             className="tree-wrapper"
//           >
//             <Tree
//               data={dataToRender}
//               orientation="horizontal"
//               translate={translate}
//               renderCustomNodeElement={renderRectNode}
//               nodeSize={{ x: 260, y: 120 }}
//               separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//               pathFunc="step"
//               zoomable={false} // disable zoom
//               draggable={false} // disable drag
//               collapsible={false} // disable collapsing nodes
//               scaleExtent={{ min: 1, max: 1 }} // fix zoom level exactly to 1 (no zoom)
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PedigreeTree;

// shamim changes 5












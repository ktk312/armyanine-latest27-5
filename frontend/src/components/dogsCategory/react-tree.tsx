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

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import { FaMars, FaVenus } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import "./styles/Pedigree.css";
// import { Box,useTheme } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }
// const MAX_GENERATIONS = 4;
// // Placeholder creator for missing ancestors
// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";

//   // If not yet at max depth, add placeholder children
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     children,
//     __rd3t: { id: `placeholder-${role}-${depth}`, depth, collapsed: false },
//   };
// };

// const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === "Male";
//   const iconColor = isMale ? "#2563eb" : "#db2777";
//   const hoverClass = isMale ? "male-hover" : "female-hover";

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
//         stroke="none"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text
//           x={0}
//           y={14}
//           textAnchor="middle"
//           fontSize="13"
//           fill="#4b5563"
//           stroke="none"
//         >
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
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [activeTab, setActiveTab] = useState<"sire" | "dam">("sire");

//   // Transform API node to TreeNodeDatum type for react-d3-tree
//   // const transformTree = (node: ApiNode): CustomTreeNodeDatum => ({
//   //   name: node.name,
//   //   accNumber: node.accNumber,
//   //   sex: node.sex,
//   //   children: node.children?.map(transformTree),
//   //   __rd3t: {
//   //     id: '',
//   //     depth: 0,
//   //     collapsed: false
//   //   }
//   // });
//   // Transform API node to tree node with placeholders
//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       // Return a placeholder if node is missing or unknown
//       return createPlaceholderNode(depth, role);
//     }

//     // Transform children, filling placeholders where missing
//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );

//         // If children less than 2, fill with placeholder
//         if (children.length < 2) {
//           if (!children[0])
//             children[0] = createPlaceholderNode(depth + 1, "Sire");
//           if (!children[1])
//             children[1] = createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         // No children present, add placeholders
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };
//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);

//         // data.children assumed to have [sire, dam]
//         const sireNode =
//           data.children && data.children[0] ? data.children[0] : null;
//         const damNode =
//           data.children && data.children[1] ? data.children[1] : null;

//         setSireTree(sireNode ? transformTree(sireNode) : null);
//         setDamTree(damNode ? transformTree(damNode) : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: 100, y: height / 2 });
//     }
//   }, [sireTree, damTree]);

//   const renderTree = () => {
//     const dataToRender = activeTab === "sire" ? sireTree : damTree;
//     if (!dataToRender)
//       return (
//         <p className="text-center text-gray-500">
//           No data available for {activeTab} lineage.
//         </p>
//       );

//     return (
//       <Tree
//         data={dataToRender}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: 260, y: 120 }}
//         separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//         pathFunc="step"
//         zoomable={false}
//         scaleExtent={{ min: 0.4, max: 2 }}
//       />
//     );
//   };

//   return (
//     <Box
//       className="pedigree-container"
//       sx={{
//         backgroundColor: (theme) =>
//           theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
//       }}
//     >
//       <div>
//         <div className="tabs-container mb-4 flex justify-center gap-4">
//           <button
//             className={`tab-button px-4 py-2 rounded ${
//               activeTab === "sire"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("sire")}
//           >
//             Sire Lineage
//           </button>
//           <button
//             className={`tab-button px-4 py-2 rounded ${
//               activeTab === "dam"
//                 ? "bg-pink-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("dam")}
//           >
//             Dam Lineage
//           </button>
//         </div>

//         <div
//           ref={containerRef}
//           className="tree-container w-full h-[80vh] bg-white rounded-lg shadow"
//         >
//           {renderTree()}
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default PedigreeTree;

//responsive and theme

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import { FaMars, FaVenus } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import "./styles/Pedigree.css";
// import { Box } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     children,
//     __rd3t: { id: `placeholder-${role}-${depth}`, depth, collapsed: false },
//   };
// };

// const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//   const customNode = nodeDatum as CustomTreeNodeDatum;
//   const isMale = customNode.sex === "Male";
//   const iconColor = isMale ? "#2563eb" : "#db2777";
//   const hoverClass = isMale ? "male-hover" : "female-hover";

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
//         stroke="none"
//       >
//         {customNode.name}
//       </text>
//       {customNode.accNumber && (
//         <text
//           x={0}
//           y={14}
//           textAnchor="middle"
//           fontSize="13"
//           fill="#4b5563"
//           stroke="none"
//         >
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
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [activeTab, setActiveTab] = useState<"sire" | "dam">("sire");

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode) : null);
//         setDamTree(damNode ? transformTree(damNode) : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: 100, y: height / 2 });
//     }
//   }, [sireTree, damTree]);

//   const renderTree = () => {
//     const dataToRender = activeTab === "sire" ? sireTree : damTree;
//     if (!dataToRender) {
//       return (
//         <p className="text-center text-gray-500">
//           No data available for {activeTab} lineage.
//         </p>
//       );
//     }

//     return (
//       <Tree
//         data={dataToRender}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: 260, y: 120 }}
//         separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//         pathFunc="step"
//         zoomable={false}
//         scaleExtent={{ min: 0.4, max: 2 }}
//       />
//     );
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1280px",
//         margin: "0 auto",
//         padding: "2rem",
//         minHeight: "100vh",
//         backgroundColor: (theme) =>
//           theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
//         transition: "background 0.5s",
//       }}
//     >
//       <div>
//         <div className="tabs-container mb-4 flex justify-center gap-4">
//           <button
//             className={`tab-button px-4 py-2 rounded ${
//               activeTab === "sire"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("sire")}
//           >
//             Sire Lineage
//           </button>
//           <button
//             className={`tab-button px-4 py-2 rounded ${
//               activeTab === "dam"
//                 ? "bg-pink-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("dam")}
//           >
//             Dam Lineage
//           </button>
//         </div>

//         <div
//           ref={containerRef}
//           className="tree-container w-full h-[80vh] bg-white rounded-lg shadow"
//         >
//           {renderTree()}
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default PedigreeTree;

//final version

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import { Box, Tooltip, IconButton, useTheme } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     children,
//     __rd3t: { id: `placeholder-${role}-${depth}`, depth, collapsed: false },
//   };
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();

//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [activeTab, setActiveTab] = useState<"sire" | "dam">("sire");
//   const [zoom, setZoom] = useState(1);
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   // Smooth zoom state for animating zoom transitions
//   const [animatedZoom, setAnimatedZoom] = useState(1);

//   const isDark = theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 2px 6px rgba(0,0,0,0.9)"
//       : "0 2px 8px rgba(0,0,0,0.1)",
//   };

//   // Animate zoom changes smoothly
//   useEffect(() => {
//     const animationFrame = requestAnimationFrame(() => {
//       setAnimatedZoom(zoom);
//     });
//     return () => cancelAnimationFrame(animationFrame);
//   }, [zoom]);

//   // Custom node with hover and fade in text animations
//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor =
//       customNode.name === "No record"
//         ? nodeColors.placeholderBg
//         : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//         onFocus={(e) => e.currentTarget.classList.add("focused")}
//         onBlur={(e) => e.currentTarget.classList.remove("focused")}
//       >
//         <rect
//           width={220}
//           height={80}
//           x={-110}
//           y={-40}
//           rx={10}
//           ry={10}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1.5}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.3s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-8}
//           textAnchor="middle"
//           fontSize="16"
//           fontWeight="600"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text"
//         >
//           {customNode.name}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={14}
//             textAnchor="middle"
//             fontSize="13"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform="translate(85, -30)">
//           {isMale ? (
//             <FaMars size={16} color={iconColor} />
//           ) : (
//             <FaVenus size={16} color={iconColor} />
//           )}
//         </g>
//       </g>
//     );
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode) : null);
//         setDamTree(damNode ? transformTree(damNode) : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: 100, y: height / 2 });
//     }
//   }, [sireTree, damTree]);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);

//   const renderTree = () => {
//     const dataToRender = activeTab === "sire" ? sireTree : damTree;
//     if (!dataToRender) {
//       return (
//         <p
//           className="text-center mt-8"
//           style={{ color: nodeColors.textSecondary, fontWeight: "500" }}
//         >
//           No data available for {activeTab} lineage.
//         </p>
//       );
//     }

//     return (
//       <Tree
//         data={dataToRender}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: 260, y: 120 }}
//         separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={animatedZoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={500} // smooth expand/collapse transitions
//       />
//     );
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1280px",
//         margin: "0 auto",
//         padding: "2rem",
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.3s, color 0.3s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 6px ${
//             isDark ? "#60a5fa" : "#3b82f6"
//           });
//           transform: scale(1.05);
//           transition: all 0.3s ease;
//         }
//         .custom-node:hover .node-text,
//         .custom-node:hover .node-subtext {
//           opacity: 1 !important;
//           transition: opacity 0.3s ease;
//         }
//         .node-text,
//         .node-subtext {
//           opacity: 0.85;
//           transition: opacity 0.3s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 2px solid ${
//             isDark ? "#93c5fd" : "#2563eb"
//           };
//           outline-offset: 4px;
//         }
//       `}</style>

//       <div>
//         {/* Tabs */}
//         <div
//           className="tabs-container mb-6 flex justify-center gap-6"
//           style={{ userSelect: "none" }}
//         >
//           {["sire", "dam"].map((tab) => {
//             const isActive = activeTab === tab;
//             const bgColor = isActive
//               ? isDark
//                 ? tab === "sire"
//                   ? "#2563eb"
//                   : "#db2777"
//                 : tab === "sire"
//                 ? "#3b82f6"
//                 : "#ec4899"
//               : isDark
//               ? "#374151"
//               : "#e5e7eb";

//             const textColor = isActive ? "#fff" : isDark ? "#d1d5db" : "#4b5563";

//             return (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab as "sire" | "dam")}
//                 style={{
//                   backgroundColor: bgColor,
//                   color: textColor,
//                   padding: "0.5rem 1.5rem",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   border: "none",
//                   cursor: "pointer",
//                   boxShadow: isActive
//                     ? isDark
//                       ? "0 0 10px rgba(37, 99, 235, 0.6)"
//                       : "0 0 10px rgba(236, 72, 153, 0.6)"
//                     : "none",
//                   transition: "all 0.3s ease",
//                   userSelect: "none",
//                 }}
//                 aria-pressed={isActive}
//               >
//                 {tab === "sire" ? "Sire Lineage" : "Dam Lineage"}
//               </button>
//             );
//           })}
//         </div>

//         {/* Tree container */}
//         <div
//           ref={containerRef}
//           style={{
//             width: "100%",
//             height: "80vh",
//             backgroundColor: isDark ? "#111827" : "#fff",
//             borderRadius: 16,
//             boxShadow: isDark
//               ? "0 8px 16px rgba(0,0,0,0.7)"
//               : "0 8px 24px rgba(0,0,0,0.1)",
//             position: "relative",
//             overflow: "hidden",
//             transition: "background-color 0.3s",
//           }}
//         >
//           {renderTree()}

//           {/* Zoom Controls */}
//           <nav
//             aria-label="Zoom controls"
//             style={{
//               position: "absolute",
//               bottom: 20,
//               right: 20,
//               backgroundColor: isDark
//                 ? "rgba(31, 41, 55, 0.85)"
//                 : "rgba(255, 255, 255, 0.85)",
//               backdropFilter: "blur(8px)",
//               borderRadius: 12,
//               padding: "6px 10px",
//               display: "flex",
//               gap: 12,
//               boxShadow: isDark
//                 ? "0 4px 12px rgba(0,0,0,0.7)"
//                 : "0 4px 12px rgba(0,0,0,0.1)",
//               zIndex: 100,
//             }}
//           >
//             <Tooltip title="Zoom In" arrow placement="left">
//               <IconButton
//                 size="medium"
//                 color="primary"
//                 onClick={zoomIn}
//                 aria-label="Zoom In"
//                 disabled={zoom >= MAX_ZOOM}
//                 sx={{
//                   color: isDark ? nodeColors.male : undefined,
//                   transition: "transform 0.2s ease",
//                   "&:hover": { transform: "scale(1.1)" },
//                   "&:focus-visible": { outline: `2px solid ${nodeColors.male}` },
//                 }}
//               >
//                 <FaPlus size={20} />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Zoom Out" arrow placement="left">
//               <IconButton
//                 size="medium"
//                 color="primary"
//                 onClick={zoomOut}
//                 aria-label="Zoom Out"
//                 disabled={zoom <= MIN_ZOOM}
//                 sx={{
//                   color: isDark ? nodeColors.female : undefined,
//                   transition: "transform 0.2s ease",
//                   "&:hover": { transform: "scale(1.1)" },
//                   "&:focus-visible": { outline: `2px solid ${nodeColors.female}` },
//                 }}
//               >
//                 <FaMinus size={20} />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Reset Zoom" arrow placement="left">
//               <IconButton
//                 size="medium"
//                 color="primary"
//                 onClick={resetZoom}
//                 aria-label="Reset Zoom"
//                 sx={{
//                   color: isDark ? "#facc15" : "#ca8a04",
//                   transition: "transform 0.2s ease",
//                   "&:hover": { transform: "rotate(90deg) scale(1.1)" },
//                   "&:focus-visible": { outline: "2px solid #facc15" },
//                 }}
//               >
//                 <FaRedo size={20} />
//               </IconButton>
//             </Tooltip>
//           </nav>
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default PedigreeTree;

//----------------> final GROK version <------------------

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: { id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`, depth, collapsed: false },
//   };
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 2px 6px rgba(0,0,0,0.9)"
//       : "0 2px 8px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [activeTab, setActiveTab] = useState<"sire" | "dam">("sire");
//   const [zoom, setZoom] = useState(1);
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const [animatedZoom, setAnimatedZoom] = useState(1);

//   const toggleDarkMode = () => {
//     setManualDarkMode(!isDark);
//   };

//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     timeout = setTimeout(() => setAnimatedZoom(zoom), 50);
//     return () => clearTimeout(timeout);
//   }, [zoom]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 200);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder ? nodeColors.placeholderBg : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//         onFocus={(e) => e.currentTarget.classList.add("focused")}
//         onBlur={(e) => e.currentTarget.classList.remove("focused")}
//       >
//         <rect
//           width={220}
//           height={80}
//           x={-110}
//           y={-40}
//           rx={10}
//           ry={10}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1.5}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.3s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-8}
//           textAnchor="middle"
//           fontSize="16"
//           fontWeight="600"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text"
//           style={{
//             textDecoration: customNode.hasPlaceholder ? "line-through" : "none",
//             opacity: customNode.hasPlaceholder ? 0.7 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={14}
//             textAnchor="middle"
//             fontSize="13"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform="translate(85, -30)">
//           {isMale ? (
//             <FaMars size={16} color={iconColor} />
//           ) : (
//             <FaVenus size={16} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-95}
//             y={-25}
//             fontSize="12"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 4, y: height / 2 });
//     }
//   }, [sireTree, damTree]);

//   const zoomIn = () => {
//     setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   };

//   const zoomOut = () => {
//     setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   };

//   const resetZoom = () => {
//     setZoom(1);
//   };

//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   const renderTree = () => {
//     const dataToRender = activeTab === "sire" ? sireTree : damTree;

//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-6">
//           <Skeleton variant="rectangular" width={200} height={70} sx={{ borderRadius: 2 }} />
//           <div className="flex gap-8">
//             {[1, 2].map((i) => (
//               <Skeleton
//                 key={i}
//                 variant="rectangular"
//                 width={200}
//                 height={70}
//                 sx={{ borderRadius: 2 }}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (!dataToRender) {
//       return (
//         <div
//           className="text-center mt-6 p-4 rounded-lg bg-opacity-20"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.5)" : "rgba(229, 231, 235, 0.5)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "500px",
//             margin: "0 auto",
//             backdropFilter: "blur(8px)",
//           }}
//         >
//           <p className="text-base mb-1">No data available for {activeTab} lineage.</p>
//           <p className="text-sm">This dog's {activeTab} information is not recorded.</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={dataToRender}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: 240, y: 100 }}
//         separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={animatedZoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={300}
//         pathClassFunc={() => "tree-link"}
//       />
//     );
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1200px",
//         margin: "0 auto",
//         padding: { xs: "0.75rem", md: "1.5rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.3s, color 0.3s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 8px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.05);
//         }
//         .custom-node:hover .node-text,
//         .custom-node:hover .node-subtext {
//           opacity: 1;
//         }
//         .node-text,
//         .node-subtext {
//           opacity: 0.85;
//           transition: opacity 0.3s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 2px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 4px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 2;
//           transition: stroke 0.3s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 3;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-2 right-2 z-50">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={toggleDarkMode}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(8px)",
//               "&:hover": {
//                 backgroundColor: isDark ? "rgba(31, 41, 55, 1)" : "rgba(255, 255, 255, 1)",
//               },
//               boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.5)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {isDark ? <FaSun className="text-yellow-300" size={18} /> : <FaMoon className="text-indigo-700" size={18} />}
//           </IconButton>
//         </Tooltip>
//       </div>

//       {/* <div className="text-center mb-4">
//         <h1 className="text-2xl font-bold mb-1" style={{ color: nodeColors.textPrimary }}>
//           Pedigree Tree
//         </h1>
//         <p className="text-base" style={{ color: nodeColors.textSecondary }}>
//           Ancestry lineage
//         </p>
//       </div> */}

//       <div className="tabs-container mb-4 flex justify-center gap-3">
//         {["sire", "dam"].map((tab) => {
//           const isActive = activeTab === tab;
//           const bgColor = isActive
//             ? isDark
//               ? tab === "sire"
//                 ? "#2563eb"
//                 : "#db2777"
//               : tab === "sire"
//               ? "#3b82f6"
//               : "#ec4899"
//             : isDark
//             ? "#374151"
//             : "#e5e7eb";
//           const textColor = isActive ? "#fff" : isDark ? "#d1d5db" : "#4b5563";

//           return (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab as "sire" | "dam")}
//               style={{
//                 backgroundColor: bgColor,
//                 color: textColor,
//                 padding: "0.4rem 1rem",
//                 borderRadius: 6,
//                 fontWeight: 600,
//                 border: "none",
//                 cursor: "pointer",
//                 boxShadow: isActive
//                   ? isDark
//                     ? `0 0 8px rgba(${tab === "sire" ? "37, 99, 235" : "219, 39, 119"}, 0.6)`
//                     : `0 0 8px rgba(${tab === "sire" ? "59, 130, 246" : "236, 72, 153"}, 0.4)`
//                   : "none",
//                 fontSize: "0.9rem",
//               }}
//               aria-pressed={isActive}
//               className="hover:scale-105 transform transition-transform"
//             >
//               {tab === "sire" ? "Sire" : "Dam"}
//             </button>
//           );
//         })}
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "75vh",
//           backgroundColor: isDark ? "#111827" : "#fff",
//           borderRadius: 12,
//           boxShadow: isDark ? "0 6px 12px rgba(0,0,0,0.7)" : "0 6px 18px rgba(0,0,0,0.1)",
//           position: "relative",
//           overflow: "auto",
//         }}
//         className="scrollbar-hide"
//       >
//         {renderTree()}

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "sticky",
//             bottom: 16,
//             right: 16,
//             float: "right",
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.85)" : "rgba(255, 255, 255, 0.85)",
//             backdropFilter: "blur(8px)",
//             borderRadius: 10,
//             padding: "4px 8px",
//             display: "flex",
//             gap: 6,
//             boxShadow: isDark ? "0 3px 10px rgba(0,0,0,0.7)" : "0 3px 10px rgba(0,0,0,0.1)",
//             zIndex: 100,
//             margin: "0 16px 16px 0",
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.male : undefined,
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={16} />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.female : undefined,
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(219, 39, 119, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={16} />
//             </IconButton>
//           </Tooltip>

//           <div className="h-6 w-px mx-1" style={{ backgroundColor: isDark ? "#4b5563" : "#d1d5db" }} />

//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 "&:hover": {
//                   transform: "rotate(90deg) scale(1.1)",
//                   backgroundColor: isDark ? "rgba(250, 204, 21, 0.2)" : "rgba(202, 138, 4, 0.1)",
//                 },
//                 "&:focus-visible": { outline: "2px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={16} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 70,
//               right: 24,
//               backgroundColor: isDark ? "rgba(37, 99, 235, 0.9)" : "rgba(59, 130, 246, 0.9)",
//               color: "white",
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: isDark ? "0 3px 10px rgba(0,0,0,0.5)" : "0 3px 10px rgba(0,0,0,0.2)",
//               zIndex: 100,
//             }}
//             className="hover:scale-110 transform"
//           >
//             <FaArrowUp size={18} />
//           </button>
//         )}
//       </div>

//       <div className="mt-4 text-center" style={{ color: nodeColors.textSecondary }}>
//         <p className="text-sm">Up to {MAX_GENERATIONS} generations</p>
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setError(null)}
//           severity="error"
//           sx={{
//             backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
//             color: isDark ? "#fecaca" : "#b91c1c",
//           }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;

//single 1

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: { id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`, depth, collapsed: false },
//   };
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 2px 6px rgba(0,0,0,0.9)"
//       : "0 2px 8px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 4, y: height / 4 });
//     }
//   }, [sireTree, damTree]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 200);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder ? nodeColors.placeholderBg : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//       >
//         <rect
//           width={220}
//           height={80}
//           x={-110}
//           y={-40}
//           rx={10}
//           ry={10}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1.5}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.3s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-8}
//           textAnchor="middle"
//           fontSize="16"
//           fontWeight="600"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text"
//           style={{
//             textDecoration: customNode.hasPlaceholder ? "line-through" : "none",
//             opacity: customNode.hasPlaceholder ? 0.7 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={14}
//             textAnchor="middle"
//             fontSize="13"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform="translate(85, -30)">
//           {isMale ? (
//             <FaMars size={16} color={iconColor} />
//           ) : (
//             <FaVenus size={16} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-95}
//             y={-25}
//             fontSize="12"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-6">
//           <Skeleton variant="rectangular" width={200} height={70} sx={{ borderRadius: 2 }} />
//           <div className="flex gap-8">
//             {[1, 2].map((i) => (
//               <Skeleton
//                 key={i}
//                 variant="rectangular"
//                 width={200}
//                 height={70}
//                 sx={{ borderRadius: 2 }}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-6 p-4 rounded-lg bg-opacity-20"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.5)" : "rgba(229, 231, 235, 0.5)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "500px",
//             margin: "0 auto",
//             backdropFilter: "blur(8px)",
//           }}
//         >
//           <p className="text-base mb-1">No data available for {title} lineage.</p>
//           <p className="text-sm">This dog's {title} information is not recorded.</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={treeData}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: 240, y: 100 }}
//         separation={{ siblings: 1.2, nonSiblings: 1.8 }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={zoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={300}
//         pathClassFunc={() => "tree-link"}
//       />
//     );
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1400px",
//         margin: "0 auto",
//         padding: { xs: "0.75rem", md: "1.5rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.3s, color 0.3s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 8px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.05);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.85;
//           transition: opacity 0.3s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 2px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 4px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 2;
//           transition: stroke 0.3s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 3;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-2 right-2 z-50">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(8px)",
//               "&:hover": {
//                 backgroundColor: isDark ? "rgba(31, 41, 55, 1)" : "rgba(255, 255, 255, 1)",
//               },
//               boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.5)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {isDark ? <FaSun className="text-yellow-300" size={18} /> : <FaMoon className="text-indigo-700" size={18} />}
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-4">
//         <h1 className="text-2xl font-bold mb-1" style={{ color: nodeColors.textPrimary }}>
//           Pedigree Tree
//         </h1>
//         <p className="text-base" style={{ color: nodeColors.textSecondary }}>
//           Sire and Dam Ancestry Lineage
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "75vh",
//           backgroundColor: isDark ? "#111827" : "#fff",
//           borderRadius: 12,
//           boxShadow: isDark ? "0 6px 12px rgba(0,0,0,0.7)" : "0 6px 18px rgba(0,0,0,0.1)",
//           position: "relative",
//           overflow: "auto",
//           display: "flex",
//         }}
//         className="scrollbar-hide"
//       >
//         <div style={{ width: "50%", borderRight: `1px solid ${isDark ? "#374151" : "#e5e7eb"}` }}>
//           <h2 className="text-lg font-semibold text-center mt-2" style={{ color: nodeColors.textPrimary }}>
//             Sire Lineage
//           </h2>
//           {renderTree(sireTree, "Sire")}
//         </div>
//         <div style={{ width: "50%" }}>
//           <h2 className="text-lg font-semibold text-center mt-2" style={{ color: nodeColors.textPrimary }}>
//             Dam Lineage
//           </h2>
//           {renderTree(damTree, "Dam")}
//         </div>

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.85)" : "rgba(255, 255, 255, 0.85)",
//             backdropFilter: "blur(8px)",
//             borderRadius: 10,
//             padding: "4px 8px",
//             display: "flex",
//             gap: 6,
//             boxShadow: isDark ? "0 3px 10px rgba(0,0,0,0.7)" : "0 3px 10px rgba(0,0,0,0.1)",
//             zIndex: 100,
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.male : undefined,
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={16} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.female : undefined,
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(219, 39, 119, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={16} />
//             </IconButton>
//           </Tooltip>
//           <div className="h-6 w-px mx-1" style={{ backgroundColor: isDark ? "#4b5563" : "#d1d5db" }} />
//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 "&:hover": {
//                   transform: "rotate(90deg) scale(1.1)",
//                   backgroundColor: isDark ? "rgba(250, 204, 21, 0.2)" : "rgba(202, 138, 4, 0.1)",
//                 },
//                 "&:focus-visible": { outline: "2px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={16} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 70,
//               right: 24,
//               backgroundColor: isDark ? "rgba(37, 99, 235, 0.9)" : "rgba(59, 130, 246, 0.9)",
//               color: "white",
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: isDark ? "0 3px 10px rgba(0,0,0,0.5)" : "0 3px 10px rgba(0,0,0,0.2)",
//               zIndex: 100,
//             }}
//             className="hover:scale-110 transform"
//           >
//             <FaArrowUp size={18} />
//           </button>
//         )}
//       </div>

//       <div className="mt-4 text-center" style={{ color: nodeColors.textSecondary }}>
//         <p className="text-sm">Up to {MAX_GENERATIONS} generations</p>
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setError(null)}
//           severity="error"
//           sx={{
//             backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
//             color: isDark ? "#fecaca" : "#b91c1c",
//           }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;

//single 2

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 3;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: { id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`, depth, collapsed: false },
//   };
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 1px 4px rgba(0,0,0,0.7)"
//       : "0 1px 6px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 5, y: height / 3 });
//     }
//   }, [sireTree, damTree]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 100);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder ? nodeColors.placeholderBg : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//       >
//         <rect
//           width={180}
//           height={60}
//           x={-90}
//           y={-30}
//           rx={8}
//           ry={8}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.2s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-5}
//           textAnchor="middle"
//           fontSize="14"
//           fontWeight="500"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text"
//           style={{
//             textDecoration: customNode.hasPlaceholder ? "line-through" : "none",
//             opacity: customNode.hasPlaceholder ? 0.7 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={12}
//             textAnchor="middle"
//             fontSize="11"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform="translate(70, -20)">
//           {isMale ? (
//             <FaMars size={14} color={iconColor} />
//           ) : (
//             <FaVenus size={14} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-80}
//             y={-15}
//             fontSize="10"
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-4">
//           <Skeleton variant="rectangular" width={160} height={50} sx={{ borderRadius: 2 }} />
//           <div className="flex gap-6">
//             {[1, 2].map((i) => (
//               <Skeleton
//                 key={i}
//                 variant="rectangular"
//                 width={160}
//                 height={50}
//                 sx={{ borderRadius: 2 }}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-4 p-3 rounded-lg bg-opacity-20"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.5)" : "rgba(229, 231, 235, 0.5)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "300px",
//             margin: "0 auto",
//             backdropFilter: "blur(6px)",
//           }}
//         >
//           <p className="text-sm mb-1">No data for {title} lineage.</p>
//           <p className="text-xs">This dog's {title} info is not recorded.</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={treeData}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: 200, y: 80 }}
//         separation={{ siblings: 1, nonSiblings: 1.5 }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={zoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={200}
//         pathClassFunc={() => "tree-link"}
//       />
//     );
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         margin: 0,
//         padding: { xs: "0.5rem", sm: "0.75rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.2s, color 0.2s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 6px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.03);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.9;
//           transition: opacity 0.2s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 1.5px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 3px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 1.5;
//           transition: stroke 0.2s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 2;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-1 right-1 z-50">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(6px)",
//               "&:hover": {
//                 backgroundColor: isDark ? "rgba(31, 41, 55, 1)" : "rgba(255, 255, 255, 1)",
//               },
//               boxShadow: isDark ? "0 1px 6px rgba(0, 0, 0, 0.4)" : "0 1px 6px rgba(0, 0, 0, 0.08)",
//               padding: "6px",
//             }}
//           >
//             {isDark ? <FaSun className="text-yellow-300" size={16} /> : <FaMoon className="text-indigo-700" size={16} />}
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-2">
//         <h1 className="text-xl font-bold" style={{ color: nodeColors.textPrimary }}>
//           Pedigree Tree
//         </h1>
//         <p className="text-sm" style={{ color: nodeColors.textSecondary }}>
//           Sire and Dam Lineage
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "75vh",
//           backgroundColor: isDark ? "#111827" : "#fff",
//           borderRadius: 8,
//           boxShadow: isDark ? "0 4px 8px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.08)",
//           position: "relative",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "row",
//         }}
//         className="scrollbar-hide"
//       >
//         <div
//           style={{
//             width: "50%",
//             borderRight: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
//             padding: "0.5rem",
//           }}
//         >
//           <h2 className="text-base font-semibold text-center" style={{ color: nodeColors.textPrimary, marginBottom: "0.5rem" }}>
//             Sire Lineage
//           </h2>
//           {renderTree(sireTree, "Sire")}
//         </div>
//         <div
//           style={{
//             width: "50%",
//             padding: "0.5rem",
//           }}
//         >
//           <h2 className="text-base font-semibold text-center" style={{ color: nodeColors.textPrimary, marginBottom: "0.5rem" }}>
//             Dam Lineage
//           </h2>
//           {renderTree(damTree, "Dam")}
//         </div>

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "fixed",
//             bottom: 10,
//             right: 10,
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.9)",
//             backdropFilter: "blur(6px)",
//             borderRadius: 8,
//             padding: "4px",
//             display: "flex",
//             gap: 4,
//             boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.6)" : "0 2px 6px rgba(0,0,0,0.08)",
//             zIndex: 100,
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.male : undefined,
//                 padding: "4px",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `1.5px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={14} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.female : undefined,
//                 padding: "4px",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(219, 39, 119, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `1.5px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={14} />
//             </IconButton>
//           </Tooltip>
//           <div className="h-5 w-px mx-1" style={{ backgroundColor: isDark ? "#4b5563" : "#d1d5db" }} />
//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 padding: "4px",
//                 "&:hover": {
//                   transform: "rotate(90deg) scale(1.1)",
//                   backgroundColor: isDark ? "rgba(250, 204, 21, 0.2)" : "rgba(202, 138, 4, 0.1)",
//                 },
//                 "&:focus-visible": { outline: "1.5px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={14} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 60,
//               right: 10,
//               backgroundColor: isDark ? "rgba(37, 99, 235, 0.9)" : "rgba(59, 130, 246, 0.9)",
//               color: "white",
//               width: 32,
//               height: 32,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.4)" : "0 2px 6px rgba(0,0,0,0.08)",
//               zIndex: 100,
//             }}
//             className="hover:scale-110 transform"
//           >
//             <FaArrowUp size={16} />
//           </button>
//         )}
//       </div>

//       <div className="mt-2 text-center" style={{ color: nodeColors.textSecondary }}>
//         <p className="text-xs">Up to {MAX_GENERATIONS} generations</p>
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setError(null)}
//           severity="error"
//           sx={{
//             backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
//             color: isDark ? "#fecaca" : "#b91c1c",
//             fontSize: "0.8rem",
//             padding: "0.5rem",
//           }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;

//top bottom design ***

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: {
//       id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`,
//       depth,
//       collapsed: false,
//     },
//   };
// };

// const countNodes = (node: TreeNodeDatum | null): number => {
//   if (!node) return 0;
//   let count = 1;
//   if (node.children) {
//     count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
//   }
//   return count;
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 1px 4px rgba(0,0,0,0.7)"
//       : "0 1px 6px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 5, y: height / 10 });
//     }
//   }, [sireTree, damTree]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 100);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getNodeDimensions = () => {
//     const width = window.innerWidth;
//     if (width < 600) return { width: 140, height: 40, fontSize: 12, accFontSize: 9, genFontSize: 8, iconSize: 10 };
//     if (width < 960) return { width: 160, height: 50, fontSize: 13, accFontSize: 10, genFontSize: 9, iconSize: 12 };
//     return { width: 180, height: 60, fontSize: 14, accFontSize: 11, genFontSize: 10, iconSize: 14 };
//   };

//   const nodeDimensions = getNodeDimensions();

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder ? nodeColors.placeholderBg : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//       >
//         <rect
//           width={nodeDimensions.width}
//           height={nodeDimensions.height}
//           x={-nodeDimensions.width / 2}
//           y={-nodeDimensions.height / 2}
//           rx={6}
//           ry={6}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.2s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-nodeDimensions.height / 6}
//           textAnchor="middle"
//           fontSize={nodeDimensions.fontSize}
//           fontWeight="500"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text"
//           style={{
//             textDecoration: customNode.hasPlaceholder ? "line-through" : "none",
//             opacity: customNode.hasPlaceholder ? 0.7 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={nodeDimensions.height / 6}
//             textAnchor="middle"
//             fontSize={nodeDimensions.accFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform={`translate(${nodeDimensions.width / 2 - 20}, ${-nodeDimensions.height / 2 + 10})`}>
//           {isMale ? (
//             <FaMars size={nodeDimensions.iconSize} color={iconColor} />
//           ) : (
//             <FaVenus size={nodeDimensions.iconSize} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-nodeDimensions.width / 2 + 10}
//             y={-nodeDimensions.height / 2 + 12}
//             fontSize={nodeDimensions.genFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-3">
//           <Skeleton
//             variant="rectangular"
//             width={nodeDimensions.width - 20}
//             height={nodeDimensions.height - 10}
//             sx={{ borderRadius: 2 }}
//           />
//           <div className="flex gap-4">
//             {[1, 2].map((i) => (
//               <Skeleton
//                 key={i}
//                 variant="rectangular"
//                 width={nodeDimensions.width - 20}
//                 height={nodeDimensions.height - 10}
//                 sx={{ borderRadius: 2 }}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-3 p-2 rounded-lg bg-opacity-20"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.5)" : "rgba(229, 231, 235, 0.5)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "280px",
//             margin: "0 auto",
//             backdropFilter: "blur(6px)",
//           }}
//         >
//           <p className="text-sm mb-1">No data for {title}.</p>
//           <p className="text-xs">This dog's {title} info is not recorded.</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={treeData}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: nodeDimensions.width + 20, y: nodeDimensions.height + 20 }}
//         separation={{ siblings: window.innerWidth < 600 ? 0.8 : 0.9, nonSiblings: window.innerWidth < 600 ? 1.0 : 1.2 }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={zoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={200}
//         pathClassFunc={() => "tree-link"}
//       />
//     );
//   };

//   const getTreeHeight = (treeData: TreeNodeDatum | null): string => {
//     if (!treeData || loading) return window.innerWidth < 600 ? "35vh" : "40vh";
//     const nodeCount = countNodes(treeData);
//     const baseHeight = window.innerWidth < 600 ? 35 : 40;
//     const heightPerNode = window.innerWidth < 600 ? 8 : 10;
//     return `${Math.max(baseHeight, nodeCount * heightPerNode)}vh`;
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         margin: 0,
//         padding: { xs: "0.5rem", sm: "0.75rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.2s, color 0.2s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 6px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.03);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.9;
//           transition: opacity 0.2s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 1.5px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 2px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 1.5;
//           transition: stroke 0.2s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 2;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-1 right-1 z-50">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(6px)",
//               "&:hover": {
//                 backgroundColor: isDark ? "rgba(31, 41, 55, 1)" : "rgba(255, 255, 255, 1)",
//               },
//               boxShadow: isDark ? "0 1px 6px rgba(0, 0, 0, 0.4)" : "0 1px 6px rgba(0, 0, 0, 0.08)",
//               padding: "6px",
//             }}
//           >
//             {isDark ? <FaSun className="text-yellow-300" size={16} /> : <FaMoon className="text-indigo-700" size={16} />}
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-2">
//         <h1 className="text-lg font-bold" style={{ color: nodeColors.textPrimary }}>
//           Pedigree Tree
//         </h1>
//         <p className="text-xs" style={{ color: nodeColors.textSecondary }}>
//           Sire and Dam Lineage
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "85vh",
//           backgroundColor: isDark ? "#111827" : "#fff",
//           borderRadius: 8,
//           boxShadow: isDark ? "0 4px 8px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.08)",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: window.innerWidth < 600 ? "1rem" : "1.5rem",
//         }}
//         className="scrollbar-hide"
//       >
//         <div
//           style={{
//             minHeight: getTreeHeight(sireTree),
//             padding: window.innerWidth < 600 ? "0.4rem" : "0.5rem",
//             borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
//           }}
//         >
//           <h2
//             className="text-base font-semibold text-center"
//             style={{ color: nodeColors.textPrimary, marginBottom: window.innerWidth < 600 ? "0.4rem" : "0.5rem" }}
//           >
//             Sire Pedigree
//           </h2>
//           {renderTree(sireTree, "Sire Pedigree")}
//         </div>
//         <div
//           style={{
//             minHeight: getTreeHeight(damTree),
//             padding: window.innerWidth < 600 ? "0.4rem" : "0.5rem",
//           }}
//         >
//           <h2
//             className="text-base font-semibold text-center"
//             style={{ color: nodeColors.textPrimary, marginBottom: window.innerWidth < 600 ? "0.4rem" : "0.5rem" }}
//           >
//             Dam Pedigree
//           </h2>
//           {renderTree(damTree, "Dam Pedigree")}
//         </div>

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "fixed",
//             bottom: 10,
//             right: 10,
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.9)",
//             backdropFilter: "blur(6px)",
//             borderRadius: 8,
//             padding: window.innerWidth < 600 ? "3px" : "4px",
//             display: "flex",
//             gap: window.innerWidth < 600 ? 3 : 4,
//             boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.6)" : "0 2px 6px rgba(0,0,0,0.08)",
//             zIndex: 100,
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.male : undefined,
//                 padding: window.innerWidth < 600 ? "3px" : "4px",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `1.5px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={window.innerWidth < 600 ? 12 : 14} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.female : undefined,
//                 padding: window.innerWidth < 600 ? "3px" : "4px",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(219, 39, 119, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `1.5px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={window.innerWidth < 600 ? 12 : 14} />
//             </IconButton>
//           </Tooltip>
//           <div
//             className="h-5 w-px mx-1"
//             style={{ backgroundColor: isDark ? "#4b5563" : "#d1d5db" }}
//           />
//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 padding: window.innerWidth < 600 ? "3px" : "4px",
//                 "&:hover": {
//                   transform: "rotate(90deg) scale(1.1)",
//                   backgroundColor: isDark ? "rgba(250, 204, 21, 0.2)" : "rgba(202, 138, 4, 0.1)",
//                 },
//                 "&:focus-visible": { outline: "1.5px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={window.innerWidth < 600 ? 12 : 14} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 60,
//               right: 10,
//               backgroundColor: isDark ? "rgba(37, 99, 235, 0.9)" : "rgba(59, 130, 246, 0.9)",
//               color: "white",
//               width: window.innerWidth < 600 ? 28 : 32,
//               height: window.innerWidth < 600 ? 28 : 32,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.4)" : "0 2px 6px rgba(0,0,0,0.08)",
//               zIndex: 100,
//             }}
//             className="hover:scale-110 transform"
//           >
//             <FaArrowUp size={window.innerWidth < 600 ? 14 : 16} />
//           </button>
//         )}
//       </div>

//       <div className="mt-2 text-center" style={{ color: nodeColors.textSecondary }}>
//         <p className="text-xs">Up to {MAX_GENERATIONS} generations</p>
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setError(null)}
//           severity="error"
//           sx={{
//             backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
//             color: isDark ? "#fecaca" : "#b91c1c",
//             fontSize: window.innerWidth < 600 ? "0.7rem" : "0.8rem",
//             padding: window.innerWidth < 600 ? "0.4rem" : "0.5rem",
//           }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;


//121212


// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: {
//       id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`,
//       depth,
//       collapsed: false,
//     },
//   };
// };

// const countNodes = (node: TreeNodeDatum | null): number => {
//   if (!node) return 0;
//   let count = 1;
//   if (node.children) {
//     count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
//   }
//   return count;
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark =
//     manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 1px 4px rgba(0,0,0,0.7)"
//       : "0 1px 6px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random()
//           .toString(36)
//           .slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 5, y: height / 10 });
//     }
//   }, [sireTree, damTree]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 100);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getNodeDimensions = () => {
//     const width = window.innerWidth;
//     if (width < 600)
//       return {
//         width: 140,
//         height: 40,
//         fontSize: 12,
//         accFontSize: 9,
//         genFontSize: 8,
//         iconSize: 10,
//       };
//     if (width < 960)
//       return {
//         width: 160,
//         height: 50,
//         fontSize: 13,
//         accFontSize: 10,
//         genFontSize: 9,
//         iconSize: 12,
//       };
//     return {
//       width: 180,
//       height: 60,
//       fontSize: 14,
//       accFontSize: 11,
//       genFontSize: 10,
//       iconSize: 14,
//     };
//   };

//   const nodeDimensions = getNodeDimensions();

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder
//       ? nodeColors.placeholderBg
//       : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//       >
//         <rect
//           width={nodeDimensions.width}
//           height={nodeDimensions.height}
//           x={-nodeDimensions.width / 2}
//           y={-nodeDimensions.height / 2}
//           rx={6}
//           ry={6}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.2s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-nodeDimensions.height / 6}
//           textAnchor="middle"
//           fontSize={nodeDimensions.fontSize}
//           fontWeight="500"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text"
//           style={{
//             textDecoration: customNode.hasPlaceholder ? "line-through" : "none",
//             opacity: customNode.hasPlaceholder ? 0.7 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={nodeDimensions.height / 6}
//             textAnchor="middle"
//             fontSize={nodeDimensions.accFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g
//           transform={`translate(${nodeDimensions.width / 2 - 20}, ${
//             -nodeDimensions.height / 2 + 10
//           })`}
//         >
//           {isMale ? (
//             <FaMars size={nodeDimensions.iconSize} color={iconColor} />
//           ) : (
//             <FaVenus size={nodeDimensions.iconSize} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-nodeDimensions.width / 2 + 10}
//             y={-nodeDimensions.height / 2 + 12}
//             fontSize={nodeDimensions.genFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-3">
//           <Skeleton
//             variant="rectangular"
//             width={nodeDimensions.width - 20}
//             height={nodeDimensions.height - 10}
//             sx={{ borderRadius: 2 }}
//           />
//           <div className="flex gap-4">
//             {[1, 2].map((i) => (
//               <Skeleton
//                 key={i}
//                 variant="rectangular"
//                 width={nodeDimensions.width - 20}
//                 height={nodeDimensions.height - 10}
//                 sx={{ borderRadius: 2 }}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-3 p-2 rounded-lg bg-opacity-20"
//           style={{
//             backgroundColor: isDark
//               ? "rgba(31, 41, 55, 0.5)"
//               : "rgba(229, 231, 235, 0.5)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "280px",
//             margin: "0 auto",
//             backdropFilter: "blur(6px)",
//           }}
//         >
//           <p className="text-sm mb-1">No data for {title}.</p>
//           <p className="text-xs">This dog's {title} info is not recorded.</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={treeData}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{
//           x: nodeDimensions.width + 20,
//           y: nodeDimensions.height + 20,
//         }}
//         separation={{
//           siblings: window.innerWidth < 600 ? 0.8 : 0.9,
//           nonSiblings: window.innerWidth < 600 ? 1.0 : 1.2,
//         }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={zoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={200}
//         pathClassFunc={() => "tree-link"}
//       />
//     );
//   };

//   const getTreeHeight = (treeData: TreeNodeDatum | null): string => {
//     if (!treeData || loading) return window.innerWidth < 600 ? "35vh" : "40vh";
//     const nodeCount = countNodes(treeData);
//     const baseHeight = window.innerWidth < 600 ? 35 : 40;
//     const heightPerNode = window.innerWidth < 600 ? 8 : 10;
//     return `${Math.max(baseHeight, nodeCount * heightPerNode)}vh`;
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         margin: 0,
//         padding: { xs: "0.5rem", sm: "0.75rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.2s, color 0.2s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 6px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.03);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.9;
//           transition: opacity 0.2s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 1.5px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 2px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 1.5;
//           transition: stroke 0.2s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 2;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-1 right-1 z-50">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark
//                 ? "rgba(31, 41, 55, 0.8)"
//                 : "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(6px)",
//               "&:hover": {
//                 backgroundColor: isDark
//                   ? "rgba(31, 41, 55, 1)"
//                   : "rgba(255, 255, 255, 1)",
//               },
//               boxShadow: isDark
//                 ? "0 1px 6px rgba(0, 0, 0, 0.4)"
//                 : "0 1px 6px rgba(0, 0, 0, 0.08)",
//               padding: "6px",
//             }}
//           >
//             {isDark ? (
//               <FaSun className="text-yellow-300" size={16} />
//             ) : (
//               <FaMoon className="text-indigo-700" size={16} />
//             )}
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-2">
//         <h1
//           className="text-lg font-bold"
//           style={{ color: nodeColors.textPrimary }}
//         >
//           Pedigree Tree
//         </h1>
//         <p className="text-xs" style={{ color: nodeColors.textSecondary }}>
//           Sire and Dam Lineage
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "85vh",
//           backgroundColor: isDark ? "#111827" : "#fff",
//           borderRadius: 8,
//           boxShadow: isDark
//             ? "0 4px 8px rgba(0,0,0,0.6)"
//             : "0 4px 12px rgba(0,0,0,0.08)",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: window.innerWidth < 600 ? "1rem" : "1.5rem",
//         }}
//         className="scrollbar-hide"
//       >
//         <div
//           style={{
//             minHeight: getTreeHeight(sireTree),
//             padding: window.innerWidth < 600 ? "0.4rem" : "0.5rem",
//             borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
//           }}
//         >
//           <div
//             className="text-sm font-semibold mb-2"
//             style={{ color: nodeColors.textPrimary }}
//           >
//             Sire Line
//           </div>
//           {renderTree(sireTree, "Sire")}
//         </div>

//         <div
//           style={{
//             minHeight: getTreeHeight(damTree),
//             padding: window.innerWidth < 600 ? "0.4rem" : "0.5rem",
//           }}
//         >
//           <div
//             className="text-sm font-semibold mb-2"
//             style={{ color: nodeColors.textPrimary }}
//           >
//             Dam Line
//           </div>
//           {renderTree(damTree, "Dam")}
//         </div>
//       </div>

//       <div className="fixed bottom-3 right-3 z-50 flex gap-2">
//         {showBackToTop && (
//           <Tooltip title="Back to top" arrow>
//             <IconButton
//               onClick={scrollToTop}
//               sx={{
//                 backgroundColor: isDark
//                   ? "rgba(31, 41, 55, 0.9)"
//                   : "rgba(255,255,255,0.9)",
//                 backdropFilter: "blur(6px)",
//                 boxShadow: isDark
//                   ? "0 1px 6px rgba(0,0,0,0.5)"
//                   : "0 1px 6px rgba(0,0,0,0.1)",
//                 "&:hover": {
//                   backgroundColor: isDark
//                     ? "rgba(31, 41, 55, 1)"
//                     : "rgba(255,255,255,1)",
//                 },
//               }}
//               size="small"
//             >
//               <FaArrowUp size={16} />
//             </IconButton>
//           </Tooltip>
//         )}
//         <Tooltip title="Zoom in" arrow>
//           <IconButton onClick={zoomIn} size="small">
//             <FaPlus />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Zoom out" arrow>
//           <IconButton onClick={zoomOut} size="small">
//             <FaMinus />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Reset zoom" arrow>
//           <IconButton onClick={resetZoom} size="small">
//             <FaRedo />
//           </IconButton>
//         </Tooltip>
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//       >
//         <Alert
//           severity="error"
//           onClose={() => setError(null)}
//           sx={{ width: "100%" }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;


//111111


//deepseek final version

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
//   useMediaQuery,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   id?: string;
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   id: string;
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: {
//       id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`,
//       depth,
//       collapsed: false,
//     },
//   };
// };

// const countNodes = (node: TreeNodeDatum | null): number => {
//   if (!node) return 0;
//   let count = 1;
//   if (node.children) {
//     count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
//   }
//   return count;
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 4px 8px rgba(0,0,0,0.6)"
//       : "0 4px 12px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ 
//         x: width / (isMobile ? 3 : 5), 
//         y: height / (isMobile ? 5 : 10) 
//       });
//     }
//   }, [sireTree, damTree, isMobile]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 100);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getNodeDimensions = () => {
//     if (isMobile) return { width: 120, height: 36, fontSize: 11, accFontSize: 8, genFontSize: 7, iconSize: 10 };
//     return { width: 160, height: 50, fontSize: 13, accFontSize: 10, genFontSize: 9, iconSize: 14 };
//   };

//   const nodeDimensions = getNodeDimensions();

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder ? nodeColors.placeholderBg : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//       >
//         <rect
//           width={nodeDimensions.width}
//           height={nodeDimensions.height}
//           x={-nodeDimensions.width / 2}
//           y={-nodeDimensions.height / 2}
//           rx={8}
//           ry={8}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1.5}
//           strokeDasharray={customNode.hasPlaceholder ? "4,4" : "0"}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.3s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-nodeDimensions.height / 6}
//           textAnchor="middle"
//           fontSize={nodeDimensions.fontSize}
//           fontWeight="600"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text truncate"
//           style={{
//             maxWidth: nodeDimensions.width - 20,
//             opacity: customNode.hasPlaceholder ? 0.8 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={nodeDimensions.height / 6}
//             textAnchor="middle"
//             fontSize={nodeDimensions.accFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform={`translate(${nodeDimensions.width / 2 - 18}, ${-nodeDimensions.height / 2 + 10})`}>
//           {isMale ? (
//             <FaMars size={nodeDimensions.iconSize} color={iconColor} />
//           ) : (
//             <FaVenus size={nodeDimensions.iconSize} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-nodeDimensions.width / 2 + 8}
//             y={-nodeDimensions.height / 2 + 12}
//             fontSize={nodeDimensions.genFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-4">
//           {[0, 1, 2].map((row) => (
//             <div key={row} className="flex gap-3 justify-center">
//               {[0, 1, 2].map((col) => (
//                 <Skeleton
//                   key={col}
//                   variant="rounded"
//                   width={nodeDimensions.width}
//                   height={nodeDimensions.height}
//                   sx={{ borderRadius: 2 }}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-3 p-3 rounded-lg"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.7)" : "rgba(229, 231, 235, 0.7)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "280px",
//             margin: "0 auto",
//             backdropFilter: "blur(8px)",
//             border: `1px dashed ${isDark ? "#4b5563" : "#9ca3af"}`
//           }}
//         >
//           <p className="text-sm mb-1 font-medium">No data for {title}</p>
//           <p className="text-xs">This dog's {title} information is not available</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={treeData}
//         orientation={isMobile ? "vertical" : "horizontal"}
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ 
//           x: nodeDimensions.width + (isMobile ? 60 : 40), 
//           y: nodeDimensions.height + (isMobile ? 80 : 50) 
//         }}
//         separation={{ 
//           siblings: isMobile ? 1.2 : 0.9, 
//           nonSiblings: isMobile ? 1.5 : 1.2 
//         }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={zoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={300}
//         pathClassFunc={() => "tree-link"}
//         collapsible={false}
//       />
//     );
//   };

//   const getTreeHeight = (treeData: TreeNodeDatum | null): string => {
//     if (!treeData || loading) return isMobile ? "40vh" : "45vh";
//     const nodeCount = countNodes(treeData);
//     const baseHeight = isMobile ? 40 : 45;
//     return `${Math.max(baseHeight, nodeCount * (isMobile ? 12 : 10))}vh`;
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         margin: 0,
//         padding: { xs: "0.5rem", sm: "1rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.3s, color 0.3s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 8px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.05);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.9;
//           transition: opacity 0.3s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 2px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 3px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 2;
//           transition: stroke 0.3s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 2.5;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-3 right-3 z-50 flex gap-2">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(241, 245, 249, 0.8)",
//               backdropFilter: "blur(8px)",
//               "&:hover": {
//                 backgroundColor: isDark ? "rgba(30, 41, 59, 1)" : "rgba(226, 232, 240, 1)",
//               },
//               boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.5)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
//               padding: "8px",
//             }}
//           >
//             {isDark ? 
//               <FaSun className="text-yellow-300" size={18} /> : 
//               <FaMoon className="text-indigo-700" size={18} />
//             }
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-4">
//         <h1 className="text-xl font-bold" style={{ color: nodeColors.textPrimary }}>
//           Pedigree Tree
//         </h1>
//         <p className="text-sm mt-1" style={{ color: nodeColors.textSecondary }}>
//           Sire and Dam Lineage • {MAX_GENERATIONS} Generations
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "85vh",
//           backgroundColor: isDark ? "#0f172a" : "#ffffff",
//           borderRadius: 12,
//           boxShadow: isDark ? "0 6px 12px rgba(0,0,0,0.7)" : "0 6px 16px rgba(0,0,0,0.1)",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: isMobile ? "1.5rem" : "2rem",
//         }}
//         className="scrollbar-hide"
//       >
//         <div
//           style={{
//             minHeight: getTreeHeight(sireTree),
//             padding: isMobile ? "0.8rem 0.4rem" : "1rem 0.5rem",
//             borderBottom: `1px solid ${isDark ? "#1e293b" : "#cbd5e1"}`,
//           }}
//         >
//           <h2
//             className="text-lg font-bold text-center mb-3"
//             style={{ 
//               color: nodeColors.male,
//               textShadow: isDark ? "0 1px 2px rgba(96, 165, 250, 0.5)" : "none"
//             }}
//           >
//             Sire Pedigree
//           </h2>
//           {renderTree(sireTree, "Sire Pedigree")}
//         </div>
//         <div
//           style={{
//             minHeight: getTreeHeight(damTree),
//             padding: isMobile ? "0.8rem 0.4rem" : "1rem 0.5rem",
//           }}
//         >
//           <h2
//             className="text-lg font-bold text-center mb-3"
//             style={{ 
//               color: nodeColors.female,
//               textShadow: isDark ? "0 1px 2px rgba(244, 114, 182, 0.5)" : "none"
//             }}
//           >
//             Dam Pedigree
//           </h2>
//           {renderTree(damTree, "Dam Pedigree")}
//         </div>

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             backgroundColor: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(241, 245, 249, 0.9)",
//             backdropFilter: "blur(8px)",
//             borderRadius: 12,
//             padding: "6px",
//             display: "flex",
//             gap: 6,
//             boxShadow: isDark ? "0 4px 10px rgba(0,0,0,0.7)" : "0 4px 12px rgba(0,0,0,0.15)",
//             zIndex: 100,
//             border: `1px solid ${isDark ? "#1e293b" : "#cbd5e1"}`
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.male : undefined,
//                 padding: "6px",
//                 "&:hover": {
//                   transform: "scale(1.15)",
//                   backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={16} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.female : undefined,
//                 padding: "6px",
//                 "&:hover": {
//                   transform: "scale(1.15)",
//                   backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(219, 39, 119, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={16} />
//             </IconButton>
//           </Tooltip>
//           <div
//             className="h-6 w-px mx-1"
//             style={{ backgroundColor: isDark ? "#334155" : "#cbd5e1" }}
//           />
//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 padding: "6px",
//                 "&:hover": {
//                   transform: "rotate(90deg) scale(1.15)",
//                   backgroundColor: isDark ? "rgba(250, 204, 21, 0.2)" : "rgba(202, 138, 4, 0.1)",
//                 },
//                 "&:focus-visible": { outline: "2px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={16} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 80,
//               right: 16,
//               backgroundColor: isDark ? "rgba(37, 99, 235, 0.9)" : "rgba(59, 130, 246, 0.9)",
//               color: "white",
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: isDark ? "0 4px 10px rgba(0,0,0,0.5)" : "0 4px 12px rgba(0,0,0,0.15)",
//               zIndex: 100,
//               transition: "transform 0.3s, background 0.3s",
//             }}
//             className="hover:scale-110"
//           >
//             <FaArrowUp size={18} />
//           </button>
//         )}
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setError(null)}
//           severity="error"
//           sx={{
//             backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
//             color: isDark ? "#fecaca" : "#b91c1c",
//             fontSize: "0.85rem",
//             padding: "0.75rem 1rem",
//             borderRadius: "12px",
//             boxShadow: isDark 
//               ? "0 4px 10px rgba(0,0,0,0.5)" 
//               : "0 4px 12px rgba(0,0,0,0.15)",
//           }}
//         >
//           <span className="font-medium">{error}</span>
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;



//chrok jani..1

// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Button,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: {
//       id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`,
//       depth,
//       collapsed: false,
//     },
//   };
// };

// const countNodes = (node: TreeNodeDatum | null): number => {
//   if (!node) return 0;
//   let count = 1;
//   if (node.children) {
//     count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
//   }
//   return count;
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 2px 6px rgba(0,0,0,0.7)"
//       : "0 2px 8px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#6b7280" : "#d1d5db",
//     activeLink: isDark ? "#93c5fd" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   const fetchPedigree = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//       const sireNode = data.children?.[0] || null;
//       const damNode = data.children?.[1] || null;
//       setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//       setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//     } catch (err) {
//       console.error("Error loading pedigree data:", err);
//       setError("Failed to load pedigree data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ x: width / 4, y: height / 2 });
//     }
//   }, [sireTree, damTree]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 100);
//       }
//     };
//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getNodeDimensions = () => {
//     const width = window.innerWidth;
//     if (width < 600) return { width: 140, height: 40, fontSize: 12, accFontSize: 9, genFontSize: 8, iconSize: 10 };
//     if (width < 960) return { width: 160, height: 50, fontSize: 13, accFontSize: 10, genFontSize: 9, iconSize: 12 };
//     return { width: 180, height: 60, fontSize: 14, accFontSize: 11, genFontSize: 10, iconSize: 14 };
//   };

//   const nodeDimensions = getNodeDimensions();

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder
//       ? nodeColors.placeholderBg
//       : `linear-gradient(135deg, ${nodeColors.nodeBoxBg}, ${isDark ? "#2d3748" : "#f1f5f9"})`;

//     return (
//       <Tooltip
//         title={customNode.hasPlaceholder ? "No record available" : `${customNode.name}${customNode.accNumber ? ` (ACC#: ${customNode.accNumber})` : ""}`}
//         arrow
//       >
//         <g
//           className="custom-node group"
//           style={{ cursor: "pointer" }}
//           tabIndex={0}
//           aria-label={`${customNode.name || "Unknown"} ${customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""}`}
//         >
//           <rect
//             width={nodeDimensions.width}
//             height={nodeDimensions.height}
//             x={-nodeDimensions.width / 2}
//             y={-nodeDimensions.height / 2}
//             rx={8}
//             ry={8}
//             fill={bgColor}
//             stroke={iconColor}
//             strokeWidth={1.5}
//             style={{
//               filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//               transition: "all 0.3s ease",
//             }}
//             className="node-rect"
//           />
//           <text
//             x={0}
//             y={-nodeDimensions.height / 6}
//             textAnchor="middle"
//             fontSize={nodeDimensions.fontSize}
//             fontWeight="600"
//             fill={nodeColors.textPrimary}
//             stroke="none"
//             className="node-text"
//             style={{
//               textDecoration: customNode.hasPlaceholder ? "line-through" : "none",
//               opacity: customNode.hasPlaceholder ? 0.6 : 1,
//             }}
//           >
//             {customNode.name || "Unknown"}
//           </text>
//           {customNode.accNumber && (
//             <text
//               x={0}
//               y={nodeDimensions.height / 6}
//               textAnchor="middle"
//               fontSize={nodeDimensions.accFontSize}
//               fill={nodeColors.textSecondary}
//               stroke="none"
//               className="node-subtext"
//             >
//               ACC#: {customNode.accNumber}
//             </text>
//           )}
//           <g transform={`translate(${nodeDimensions.width / 2 - 20}, ${-nodeDimensions.height / 2 + 10})`}>
//             {isMale ? (
//               <FaMars size={nodeDimensions.iconSize} color={iconColor} />
//             ) : (
//               <FaVenus size={nodeDimensions.iconSize} color={iconColor} />
//             )}
//           </g>
//           {customNode.depth !== undefined && (
//             <text
//               x={-nodeDimensions.width / 2 + 10}
//               y={-nodeDimensions.height / 2 + 12}
//               fontSize={nodeDimensions.genFontSize}
//               fill={nodeColors.textSecondary}
//               stroke="none"
//               className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//             >
//               Gen {customNode.depth + 1}
//             </text>
//           )}
//         </g>
//       </Tooltip>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-4 p-3 rounded-lg bg-opacity-30"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.6)" : "rgba(229, 231, 235, 0.6)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "300px",
//             margin: "0 auto",
//             backdropFilter: "blur(8px)",
//           }}
//         >
//           <p className="text-sm mb-1">No data for {title}</p>
//           <p className="text-xs">This dog's {title} info is not recorded.</p>
//         </div>
//       );
//     }

//     const width = window.innerWidth;
//     const separation = {
//       siblings: 0.7 + (width / 3000),
//       nonSiblings: 1.0 + (width / 2500),
//     };

//     return (
//       <Tree
//         data={treeData}
//         orientation="horizontal"
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ x: nodeDimensions.width + 30, y: nodeDimensions.height + 30 }}
//         separation={separation}
//         pathFunc="step"
//         zoomable={true}
//         zoom={zoom}
//         onUpdate={({ zoom: newZoom }) => setZoom(newZoom)}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={300}
//         pathClassFunc={() => "tree-link"}
//       />
//     );
//   };

//   const getTreeHeight = (treeData: TreeNodeDatum | null): string => {
//     if (!treeData) return window.innerWidth < 600 ? "30vh" : "35vh";
//     const nodeCount = countNodes(treeData);
//     const baseHeight = window.innerWidth < 600 ? 30 : 35;
//     const heightPerNode = window.innerWidth < 600 ? 7 : 9;
//     return `${Math.max(baseHeight, nodeCount * heightPerNode)}vh`;
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "100%",
//           margin: 0,
//           padding: { xs: "1rem", sm: "1.5rem" },
//           minHeight: "100vh",
//           backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//           color: nodeColors.textPrimary,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div className="flex flex-col items-center gap-4">
//           <Skeleton variant="rectangular" width="80%" height={40} sx={{ borderRadius: 2, animation: "wave" }} />
//           <div className="flex gap-4">
//             <Skeleton variant="rectangular" width={160} height={60} sx={{ borderRadius: 2, animation: "wave" }} />
//             <Skeleton variant="rectangular" width={160} height={60} sx={{ borderRadius: 2, animation: "wave" }} />
//           </div>
//         </div>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "100%",
//           margin: 0,
//           padding: { xs: "1rem", sm: "1.5rem" },
//           minHeight: "100vh",
//           backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//           color: nodeColors.textPrimary,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div className="flex flex-col items-center gap-3">
//           <p className="text-base font-semibold">Failed to Load Pedigree Data</p>
//           <p className="text-sm" style={{ color: nodeColors.textSecondary }}>{error}</p>
//           <Button
//             onClick={fetchPedigree}
//             variant="contained"
//             color="primary"
//             size="small"
//             sx={{ mt: 1 }}
//           >
//             Retry
//           </Button>
//         </div>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         margin: 0,
//         padding: { xs: "1rem", sm: "1.5rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#1e293b" : "#f9fafb",
//         color: nodeColors.textPrimary,
//         transition: "all 0.3s ease",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 8px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.05);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.9;
//           transition: opacity 0.3s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 2px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 3px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 2;
//           transition: stroke 0.3s ease, stroke-width 0.3s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 2.5;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-2 right-2 z-50">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(8px)",
//               "&:hover": { backgroundColor: isDark ? "rgba(31, 41, 55, 1)" : "rgba(255, 255, 255, 1)" },
//               boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.5)" : "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             {isDark ? <FaSun className="text-yellow-300" size={18} /> : <FaMoon className="text-indigo-700" size={18} />}
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-4">
//         <h1 className="text-xl font-bold" style={{ color: nodeColors.textPrimary }}>
//           Pedigree Tree
//         </h1>
//         <p className="text-sm" style={{ color: nodeColors.textSecondary }}>
//           Sire and Dam Lineage
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           backgroundColor: isDark ? "#111827" : "#ffffff",
//           borderRadius: 12,
//           boxShadow: isDark ? "0 6px 12px rgba(0,0,0,0.6)" : "0 6px 12px rgba(0,0,0,0.1)",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: "2rem",
//           padding: "1rem",
//         }}
//         className="scrollbar-hide"
//       >
//         <div style={{ minHeight: getTreeHeight(sireTree), padding: "0.5rem" }}>
//           <h2 className="text-lg font-semibold text-center" style={{ color: nodeColors.textPrimary, marginBottom: "0.75rem" }}>
//             Sire Pedigree
//           </h2>
//           {renderTree(sireTree, "Sire Pedigree")}
//         </div>
//         <div style={{ minHeight: getTreeHeight(damTree), padding: "0.5rem" }}>
//           <h2 className="text-lg font-semibold text-center" style={{ color: nodeColors.textPrimary, marginBottom: "0.75rem" }}>
//             Dam Pedigree
//           </h2>
//           {renderTree(damTree, "Dam Pedigree")}
//         </div>

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.95)" : "rgba(255, 255, 255, 0.95)",
//             backdropFilter: "blur(10px)",
//             borderRadius: 10,
//             padding: "6px",
//             display: "flex",
//             gap: 6,
//             boxShadow: isDark ? "0 4px 8px rgba(0,0,0,0.6)" : "0 4px 8px rgba(0,0,0,0.1)",
//             zIndex: 100,
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: nodeColors.male,
//                 "&:hover": { transform: "scale(1.1)", backgroundColor: "rgba(96, 165, 250, 0.2)" },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={16} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: nodeColors.female,
//                 "&:hover": { transform: "scale(1.1)", backgroundColor: "rgba(244, 114, 182, 0.2)" },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={16} />
//             </IconButton>
//           </Tooltip>
//           <div className="h-6 w-px" style={{ backgroundColor: nodeColors.linkColor }} />
//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 "&:hover": { transform: "rotate(90deg) scale(1.1)", backgroundColor: "rgba(250, 204, 21, 0.2)" },
//                 "&:focus-visible": { outline: "2px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={16} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 80,
//               right: 20,
//               backgroundColor: nodeColors.male,
//               color: "#fff",
//               width: 36,
//               height: 36,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//               zIndex: 100,
//             }}
//             className="hover:scale-110 transition-transform duration-200"
//           >
//             <FaArrowUp size={18} />
//           </button>
//         )}
//       </div>

//       <div className="mt-4 text-center" style={{ color: nodeColors.textSecondary }}>
//         <p className="text-sm">Up to {MAX_GENERATIONS} generations</p>
//         <div className="flex justify-center gap-6 mt-2">
//           <div className="flex items-center gap-2">
//             <div style={{ width: 14, height: 14, backgroundColor: nodeColors.male, borderRadius: 4 }} />
//             <span className="text-sm">Male</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div style={{ width: 14, height: 14, backgroundColor: nodeColors.female, borderRadius: 4 }} />
//             <span className="text-sm">Female</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div style={{ width: 14, height: 14, backgroundColor: nodeColors.placeholderBg, borderRadius: 4 }} />
//             <span className="text-sm">No record</span>
//           </div>
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default PedigreeTree;



// import { useEffect, useRef, useState } from "react";
// import Tree, { TreeNodeDatum, CustomNodeElementProps } from "react-d3-tree";
// import axios from "axios";
// import {
//   FaMars,
//   FaVenus,
//   FaPlus,
//   FaMinus,
//   FaRedo,
//   FaSun,
//   FaMoon,
//   FaArrowUp,
// } from "react-icons/fa";
// import { BASE_URL } from "../../config/constant";
// import {
//   Box,
//   Tooltip,
//   IconButton,
//   useTheme,
//   Skeleton,
//   Snackbar,
//   Alert,
//   useMediaQuery,
// } from "@mui/material";

// interface CustomTreeNodeDatum extends TreeNodeDatum {
//   id?: string;
//   accNumber?: string;
//   sex?: string;
//   role?: "Sire" | "Dam" | "Unknown";
//   depth?: number;
//   hasPlaceholder?: boolean;
// }

// interface ApiNode {
//   id: string;
//   name: string;
//   accNumber?: string;
//   sex?: string;
//   children?: ApiNode[];
// }

// const MAX_GENERATIONS = 4;

// const createPlaceholderNode = (
//   depth: number,
//   role: "Sire" | "Dam" | "Unknown" = "Unknown"
// ): CustomTreeNodeDatum => {
//   const sex = role === "Sire" ? "Male" : role === "Dam" ? "Female" : "Unknown";
//   const children =
//     depth < MAX_GENERATIONS - 1
//       ? [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ]
//       : [];

//   return {
//     name: "No record",
//     accNumber: "",
//     sex,
//     role,
//     hasPlaceholder: true,
//     children,
//     __rd3t: {
//       id: `placeholder-${role}-${depth}-${Math.random().toString(36).slice(2)}`,
//       depth,
//       collapsed: false,
//     },
//   };
// };

// const countNodes = (node: TreeNodeDatum | null): number => {
//   if (!node) return 0;
//   let count = 1;
//   if (node.children) {
//     count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
//   }
//   return count;
// };

// const PedigreeTree: React.FC<{ dogId: number }> = ({ dogId }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [manualDarkMode, setManualDarkMode] = useState<boolean | null>(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sireTree, setSireTree] = useState<TreeNodeDatum | null>(null);
//   const [damTree, setDamTree] = useState<TreeNodeDatum | null>(null);
//   const [dogName, setDogName] = useState<string>("");
//   const [zoom, setZoom] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const MIN_ZOOM = 0.4;
//   const MAX_ZOOM = 2;

//   const isDark = manualDarkMode !== null ? manualDarkMode : theme.palette.mode === "dark";

//   const nodeColors = {
//     male: isDark ? "#60a5fa" : "#2563eb",
//     female: isDark ? "#f472b6" : "#db2777",
//     placeholderBg: isDark ? "#374151" : "#f3f4f6",
//     textPrimary: isDark ? "#e0e7ff" : "#1f2937",
//     textSecondary: isDark ? "#9ca3af" : "#4b5563",
//     nodeBoxBg: isDark ? "#1f2937" : "#ffffff",
//     nodeBoxShadow: isDark
//       ? "0 4px 8px rgba(0,0,0,0.6)"
//       : "0 4px 12px rgba(0,0,0,0.1)",
//     linkColor: isDark ? "#4b5563" : "#d1d5db",
//     activeLink: isDark ? "#60a5fa" : "#3b82f6",
//   };

//   const transformTree = (
//     node: ApiNode | null,
//     depth = 0,
//     role: "Sire" | "Dam" | "Unknown" = "Unknown"
//   ): CustomTreeNodeDatum => {
//     if (!node || !node.name || node.name.toLowerCase() === "unknown") {
//       return createPlaceholderNode(depth, role);
//     }

//     let children: CustomTreeNodeDatum[] = [];
//     if (depth < MAX_GENERATIONS - 1) {
//       if (node.children && node.children.length > 0) {
//         children = node.children.map((child, idx) =>
//           transformTree(child, depth + 1, idx === 0 ? "Sire" : "Dam")
//         );
//         if (children.length < 2) {
//           children[0] = children[0] || createPlaceholderNode(depth + 1, "Sire");
//           children[1] = children[1] || createPlaceholderNode(depth + 1, "Dam");
//         }
//       } else {
//         children = [
//           createPlaceholderNode(depth + 1, "Sire"),
//           createPlaceholderNode(depth + 1, "Dam"),
//         ];
//       }
//     }

//     return {
//       name: node.name,
//       accNumber: node.accNumber,
//       sex: node.sex,
//       role,
//       depth,
//       children,
//       __rd3t: {
//         id: `${node.accNumber || node.name}-${depth}-${Math.random().toString(36).slice(2)}`,
//         depth,
//         collapsed: false,
//       },
//     };
//   };

//   useEffect(() => {
//     const fetchPedigree = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await axios.get(`${BASE_URL}/dog/pedigree/${dogId}`);
//         setDogName(data.name || "Unknown");
//         const sireNode = data.children?.[0] || null;
//         const damNode = data.children?.[1] || null;

//         setSireTree(sireNode ? transformTree(sireNode, 0, "Sire") : null);
//         setDamTree(damNode ? transformTree(damNode, 0, "Dam") : null);
//       } catch (err) {
//         console.error("Error loading pedigree data:", err);
//         setError("Failed to load pedigree data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPedigree();
//   }, [dogId]);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       setTranslate({ 
//         x: width / (isMobile ? 3 : 5), 
//         y: height / (isMobile ? 5 : 10) 
//       });
//     }
//   }, [sireTree, damTree, isMobile]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         setShowBackToTop(containerRef.current.scrollTop > 100);
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, MAX_ZOOM));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, MIN_ZOOM));
//   const resetZoom = () => setZoom(1);
//   const scrollToTop = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getNodeDimensions = () => {
//     if (isMobile) return { width: 120, height: 36, fontSize: 11, accFontSize: 8, genFontSize: 7, iconSize: 10 };
//     return { width: 160, height: 50, fontSize: 13, accFontSize: 10, genFontSize: 9, iconSize: 14 };
//   };

//   const nodeDimensions = getNodeDimensions();

//   const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
//     const customNode = nodeDatum as CustomTreeNodeDatum;
//     const isMale = customNode.sex === "Male";
//     const iconColor = isMale ? nodeColors.male : nodeColors.female;
//     const bgColor = customNode.hasPlaceholder ? nodeColors.placeholderBg : nodeColors.nodeBoxBg;

//     return (
//       <g
//         className="custom-node group"
//         style={{ cursor: "default" }}
//         tabIndex={0}
//         aria-label={`${customNode.name || "Unknown"} ${
//           customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
//         }`}
//       >
//         <rect
//           width={nodeDimensions.width}
//           height={nodeDimensions.height}
//           x={-nodeDimensions.width / 2}
//           y={-nodeDimensions.height / 2}
//           rx={8}
//           ry={8}
//           fill={bgColor}
//           stroke={iconColor}
//           strokeWidth={1.5}
//           strokeDasharray={customNode.hasPlaceholder ? "4,4" : "0"}
//           style={{
//             filter: `drop-shadow(${nodeColors.nodeBoxShadow})`,
//             transition: "all 0.3s ease",
//           }}
//           className="node-rect"
//         />
//         <text
//           x={0}
//           y={-nodeDimensions.height / 6}
//           textAnchor="middle"
//           fontSize={nodeDimensions.fontSize}
//           fontWeight="600"
//           fill={nodeColors.textPrimary}
//           stroke="none"
//           className="node-text truncate"
//           style={{
//             maxWidth: nodeDimensions.width - 20,
//             opacity: customNode.hasPlaceholder ? 0.8 : 1,
//           }}
//         >
//           {customNode.name || "Unknown"}
//         </text>
//         {customNode.accNumber && (
//           <text
//             x={0}
//             y={nodeDimensions.height / 6}
//             textAnchor="middle"
//             fontSize={nodeDimensions.accFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="node-subtext"
//           >
//             ACC#: {customNode.accNumber}
//           </text>
//         )}
//         <g transform={`translate(${nodeDimensions.width / 2 - 18}, ${-nodeDimensions.height / 2 + 10})`}>
//           {isMale ? (
//             <FaMars size={nodeDimensions.iconSize} color={iconColor} />
//           ) : (
//             <FaVenus size={nodeDimensions.iconSize} color={iconColor} />
//           )}
//         </g>
//         {customNode.depth !== undefined && (
//           <text
//             x={-nodeDimensions.width / 2 + 8}
//             y={-nodeDimensions.height / 2 + 12}
//             fontSize={nodeDimensions.genFontSize}
//             fill={nodeColors.textSecondary}
//             stroke="none"
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           >
//             Gen {customNode.depth + 1}
//           </text>
//         )}
//       </g>
//     );
//   };

//   const renderTree = (treeData: TreeNodeDatum | null, title: string) => {
//     if (loading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-full gap-4">
//           {[0, 1, 2].map((row) => (
//             <div key={row} className="flex gap-3 justify-center">
//               {[0, 1, 2].map((col) => (
//                 <Skeleton
//                   key={col}
//                   variant="rounded"
//                   width={nodeDimensions.width}
//                   height={nodeDimensions.height}
//                   sx={{ borderRadius: 2 }}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (!treeData) {
//       return (
//         <div
//           className="text-center mt-3 p-3 rounded-lg"
//           style={{
//             backgroundColor: isDark ? "rgba(31, 41, 55, 0.7)" : "rgba(229, 231, 235, 0.7)",
//             color: nodeColors.textSecondary,
//             fontWeight: "500",
//             maxWidth: "280px",
//             margin: "0 auto",
//             backdropFilter: "blur(8px)",
//             border: `1px dashed ${isDark ? "#4b5563" : "#9ca3af"}`
//           }}
//         >
//           <p className="text-sm mb-1 font-medium">No data for {title}</p>
//           <p className="text-xs">This dog's {title} information is not available</p>
//         </div>
//       );
//     }

//     return (
//       <Tree
//         data={treeData}
//         orientation={isMobile ? "vertical" : "horizontal"}
//         translate={translate}
//         renderCustomNodeElement={renderRectNode}
//         nodeSize={{ 
//           x: nodeDimensions.width + (isMobile ? 60 : 40), 
//           y: nodeDimensions.height + (isMobile ? 80 : 50) 
//         }}
//         separation={{ 
//           siblings: isMobile ? 1.2 : 0.9, 
//           nonSiblings: isMobile ? 1.5 : 1.2 
//         }}
//         pathFunc="step"
//         zoomable={false}
//         zoom={zoom}
//         scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
//         transitionDuration={300}
//         pathClassFunc={() => "tree-link"}
//         collapsible={false}
//       />
//     );
//   };

//   const getTreeHeight = (treeData: TreeNodeDatum | null): string => {
//     if (!treeData || loading) return isMobile ? "40vh" : "45vh";
//     const nodeCount = countNodes(treeData);
//     const baseHeight = isMobile ? 40 : 45;
//     return `${Math.max(baseHeight, nodeCount * (isMobile ? 12 : 10))}vh`;
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         margin: 0,
//         padding: { xs: "0.5rem", sm: "1rem" },
//         minHeight: "100vh",
//         backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
//         color: nodeColors.textPrimary,
//         transition: "background-color 0.3s, color 0.3s",
//         userSelect: "none",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         .custom-node:hover .node-rect {
//           filter: drop-shadow(0 0 8px ${isDark ? "#60a5fa" : "#3b82f6"});
//           transform: scale(1.05);
//         }
//         .node-text, .node-subtext {
//           opacity: 0.9;
//           transition: opacity 0.3s ease;
//         }
//         .custom-node.focused .node-rect {
//           outline: 2px solid ${isDark ? "#93c5fd" : "#2563eb"};
//           outline-offset: 3px;
//         }
//         .tree-link {
//           stroke: ${nodeColors.linkColor};
//           stroke-width: 2;
//           transition: stroke 0.3s ease;
//         }
//         .tree-link:hover {
//           stroke: ${nodeColors.activeLink};
//           stroke-width: 2.5;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="absolute top-3 right-3 z-50 flex gap-2">
//         <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
//           <IconButton
//             onClick={() => setManualDarkMode(!isDark)}
//             aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
//             sx={{
//               backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(241, 245, 249, 0.8)",
//               backdropFilter: "blur(8px)",
//               "&:hover": {
//                 backgroundColor: isDark ? "rgba(30, 41, 59, 1)" : "rgba(226, 232, 240, 1)",
//               },
//               boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.5)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
//               padding: "8px",
//             }}
//           >
//             {isDark ? 
//               <FaSun className="text-yellow-300" size={18} /> : 
//               <FaMoon className="text-indigo-700" size={18} />
//             }
//           </IconButton>
//         </Tooltip>
//       </div>

//       <div className="text-center mb-4">
//         {loading ? (
//           <>
//             <Skeleton variant="text" width={200} height={40} sx={{ margin: "0 auto" }} />
//             <Skeleton variant="text" width={150} height={20} sx={{ margin: "0.5rem auto" }} />
//           </>
//         ) : (
//           <>
//             <h1 className="text-2xl font-bold" style={{ color: nodeColors.textPrimary }}>
//              {dogName}
//             </h1>
//             {/* <p className="text-sm mt-1" style={{ color: nodeColors.textSecondary }}>
//               Sire and Dam Lineage • {MAX_GENERATIONS} Generations
//             </p> */}
//           </>
//         )}
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100'",
//           height: "85vh",
//           backgroundColor: isDark ? "#0f172a" : "#ffffff",
//           borderRadius: 12,
//           boxShadow: isDark ? "0 6px 12px rgba(0,0,0,0.7)" : "0 6px 16px rgba(0,0,0,0.1)",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: isMobile ? "1.5rem" : "2rem",
//         }}
//         className="scrollbar-hide"
//       >
//         <div
//           style={{
//             minHeight: getTreeHeight(sireTree),
//             padding: isMobile ? "0.8rem 0.4rem" : "1rem 0.5rem",
//             borderBottom: `1px solid ${isDark ? "#1e293b" : "#cbd5e1"}`,
//           }}
//         >
//           <h2
//             className="text-lg font-bold text-center mb-3"
//             style={{ 
//               color: nodeColors.male,
//               textShadow: isDark ? "0 1px 2px rgba(96, 165, 250, 0.5)" : "none"
//             }}
//           >
//             Sire Pedigree
//           </h2>
//           {renderTree(sireTree, "Sire Pedigree")}
//         </div>
//         <div
//           style={{
//             minHeight: getTreeHeight(damTree),
//             padding: isMobile ? "0.8rem 0.4rem" : "1rem 0.5rem",
//           }}
//         >
//           <h2
//             className="text-lg font-bold text-center mb-3"
//             style={{ 
//               color: nodeColors.female,
//               textShadow: isDark ? "0 1px 2px rgba(244, 114, 182, 0.5)" : "none"
//             }}
//           >
//             Dam Pedigree
//           </h2>
//           {renderTree(damTree, "Dam Pedigree")}
//         </div>

//         <nav
//           aria-label="Zoom controls"
//           style={{
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             backgroundColor: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(241, 245, 249, 0.9)",
//             backdropFilter: "blur(8px)",
//             borderRadius: 12,
//             padding: "6px",
//             display: "flex",
//             gap: 6,
//             boxShadow: isDark ? "0 4px 10px rgba(0,0,0,0.7)" : "0 4px 12px rgba(0,0,0,0.15)",
//             zIndex: 100,
//             border: `1px solid ${isDark ? "#1e293b" : "#cbd5e1"}`
//           }}
//         >
//           <Tooltip title="Zoom In" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomIn}
//               aria-label="Zoom In"
//               disabled={zoom >= MAX_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.male : undefined,
//                 padding: "6px",
//                 "&:hover": {
//                   transform: "scale(1.15)",
//                   backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.male}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaPlus size={16} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Zoom Out" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={zoomOut}
//               aria-label="Zoom Out"
//               disabled={zoom <= MIN_ZOOM}
//               sx={{
//                 color: isDark ? nodeColors.female : undefined,
//                 padding: "6px",
//                 "&:hover": {
//                   transform: "scale(1.15)",
//                   backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(219, 39, 119, 0.1)",
//                 },
//                 "&:focus-visible": { outline: `2px solid ${nodeColors.female}` },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaMinus size={16} />
//             </IconButton>
//           </Tooltip>
//           <div
//             className="h-6 w-px mx-1"
//             style={{ backgroundColor: isDark ? "#334155" : "#cbd5e1" }}
//           />
//           <Tooltip title="Reset Zoom" arrow placement="left">
//             <IconButton
//               size="small"
//               onClick={resetZoom}
//               aria-label="Reset Zoom"
//               disabled={zoom === 1}
//               sx={{
//                 color: isDark ? "#facc15" : "#ca8a04",
//                 padding: "6px",
//                 "&:hover": {
//                   transform: "rotate(90deg) scale(1.15)",
//                   backgroundColor: isDark ? "rgba(250, 204, 21, 0.2)" : "rgba(202, 138, 4, 0.1)",
//                 },
//                 "&:focus-visible": { outline: "2px solid #facc15" },
//                 "&:disabled": { opacity: 0.5 },
//               }}
//             >
//               <FaRedo size={16} />
//             </IconButton>
//           </Tooltip>
//         </nav>

//         {showBackToTop && (
//           <button
//             onClick={scrollToTop}
//             aria-label="Scroll to top"
//             style={{
//               position: "fixed",
//               bottom: 80,
//               right: 16,
//               backgroundColor: isDark ? "rgba(37, 99, 235, 0.9)" : "rgba(59, 130, 246, 0.9)",
//               color: "white",
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "none",
//               cursor: "pointer",
//               boxShadow: isDark ? "0 4px 10px rgba(0,0,0,0.5)" : "0 4px 12px rgba(0,0,0,0.15)",
//               zIndex: 100,
//               transition: "transform 0.3s, background 0.3s",
//             }}
//             className="hover:scale-110"
//           >
//             <FaArrowUp size={18} />
//           </button>
//         )}
//       </div>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setError(null)}
//           severity="error"
//           sx={{
//             backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
//             color: isDark ? "#fecaca" : "#b91c1c",
//             fontSize: "0.85rem",
//             padding: "0.75rem 1rem",
//             borderRadius: "12px",
//             boxShadow: isDark 
//               ? "0 4px 10px rgba(0,0,0,0.5)" 
//               : "0 4px 12px rgba(0,0,0,0.15)",
//           }}
//         >
//           <span className="font-medium">{error}</span>
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PedigreeTree;

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
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
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

  const getNodeDimensions = () => {
    if (isMobile) return { width: 120, height: 36, fontSize: 11, accFontSize: 8, genFontSize: 7, iconSize: 10 };
    return { width: 160, height: 50, fontSize: 13, accFontSize: 10, genFontSize: 9, iconSize: 14 };
  };

  const nodeDimensions = getNodeDimensions();

  const renderRectNode = ({ nodeDatum }: CustomNodeElementProps) => {
    const customNode = nodeDatum as CustomTreeNodeDatum;
    const isMale = customNode.sex === "Male";

    return (
      <g
        className={`custom-node group ${customNode.sex?.toLowerCase() || 'unknown'} ${customNode.hasPlaceholder ? 'placeholder' : ''}`}
        style={{ cursor: "default" }}
        tabIndex={0}
        aria-label={`${customNode.name || "Unknown"} ${
          customNode.accNumber ? `ACC number ${customNode.accNumber}` : ""
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
    </Box>
  );
};

export default PedigreeTree;
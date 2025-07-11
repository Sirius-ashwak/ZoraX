import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Users, 
  Eye, 
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface RemixNode {
  id: string;
  title: string;
  creator: string;
  avatar?: string;
  timestamp: string;
  level: number;
  mints: number;
  children: RemixNode[];
  isOriginal?: boolean;
}

interface RemixTreeViewerProps {
  originalCampaign: {
    id: string;
    title: string;
    creator: string;
  };
  className?: string;
}

// Mock remix tree data
const mockRemixTree: RemixNode = {
  id: 'original',
  title: 'Cosmic Sounddrop Vol.1',
  creator: 'cosmic.eth',
  timestamp: '2024-01-15T10:00:00Z',
  level: 0,
  mints: 500,
  isOriginal: true,
  children: [
    {
      id: 'remix-1',
      title: 'Cosmic Sounddrop: Stellar Mix',
      creator: 'stellar.eth',
      timestamp: '2024-01-20T14:30:00Z',
      level: 1,
      mints: 123,
      children: [
        {
          id: 'remix-1-1',
          title: 'Stellar Mix: Nebula Edition',
          creator: 'nebula.eth',
          timestamp: '2024-01-25T09:15:00Z',
          level: 2,
          mints: 67,
          children: []
        },
        {
          id: 'remix-1-2',
          title: 'Stellar Mix: Galaxy Vibes',
          creator: 'galaxy.eth',
          timestamp: '2024-01-28T16:45:00Z',
          level: 2,
          mints: 89,
          children: [
            {
              id: 'remix-1-2-1',
              title: 'Galaxy Vibes: Deep Space',
              creator: 'deepspace.eth',
              timestamp: '2024-02-05T11:20:00Z',
              level: 3,
              mints: 45,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'remix-2',
      title: 'Cosmic Sounddrop: Remix Revolution',
      creator: 'revolution.eth',
      timestamp: '2024-01-22T08:00:00Z',
      level: 1,
      mints: 156,
      children: [
        {
          id: 'remix-2-1',
          title: 'Revolution: Quantum Beats',
          creator: 'quantum.eth',
          timestamp: '2024-02-01T13:30:00Z',
          level: 2,
          mints: 78,
          children: []
        }
      ]
    },
    {
      id: 'remix-3',
      title: 'Cosmic Sounddrop: Ambient Journey',
      creator: 'ambient.eth',
      timestamp: '2024-01-30T19:20:00Z',
      level: 1,
      mints: 234,
      children: []
    }
  ]
};

const TreeNode: React.FC<{
  node: RemixNode;
  onNodeClick: (node: RemixNode) => void;
  scale: number;
}> = ({ node, onNodeClick, scale }) => {
  const nodeWidth = 280 * scale;
  const nodeHeight = 120 * scale;
  const displayName = node.creator.length > 12 ? `${node.creator.slice(0, 10)}...` : node.creator;

  return (
    <g>
      {/* Node */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: node.level * 0.1 }}
        style={{ cursor: 'pointer' }}
        onClick={() => onNodeClick(node)}
      >
        {/* Node background */}
        <rect
          width={nodeWidth}
          height={nodeHeight}
          rx={12 * scale}
          fill={node.isOriginal ? "rgba(99, 102, 241, 0.1)" : "rgba(139, 92, 246, 0.1)"}
          stroke={node.isOriginal ? "rgba(99, 102, 241, 0.3)" : "rgba(139, 92, 246, 0.3)"}
          strokeWidth={2 * scale}
          className="hover:fill-opacity-20 transition-all duration-200"
        />
        
        {/* Original badge */}
        {node.isOriginal && (
          <rect
            x={nodeWidth - 60 * scale}
            y={8 * scale}
            width={52 * scale}
            height={20 * scale}
            rx={10 * scale}
            fill="rgba(99, 102, 241, 0.8)"
          />
        )}
        
        {/* Content */}
        <foreignObject x={12 * scale} y={12 * scale} width={nodeWidth - 24 * scale} height={nodeHeight - 24 * scale}>
          <div className="h-full flex flex-col justify-between" style={{ fontSize: `${14 * scale}px` }}>
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2 mb-1" style={{ lineHeight: 1.2 }}>
                {node.title}
              </h3>
              <p className="text-muted-foreground text-xs">
                by {displayName}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {node.mints} mints
              </span>
              <span className="text-muted-foreground">
                Level {node.level}
              </span>
            </div>
          </div>
        </foreignObject>

        {/* Original badge text */}
        {node.isOriginal && (
          <text
            x={nodeWidth - 34 * scale}
            y={22 * scale}
            textAnchor="middle"
            fill="white"
            fontSize={10 * scale}
            fontWeight="500"
          >
            OG
          </text>
        )}
      </motion.g>

      {/* Children */}
      {node.children.map((child, index) => {
        const childX = (index - (node.children.length - 1) / 2) * (nodeWidth + 60 * scale);
        const childY = 180 * scale;

        return (
          <g key={child.id}>
            {/* Connection line */}
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 0.8, delay: (node.level + 1) * 0.15 }}
              x1={nodeWidth / 2}
              y1={nodeHeight}
              x2={childX + nodeWidth / 2}
              y2={childY}
              stroke="rgba(139, 92, 246, 0.6)"
              strokeWidth={2 * scale}
              strokeDasharray={`${5 * scale},${3 * scale}`}
            />
            
            {/* Child node */}
            <g transform={`translate(${childX}, ${childY})`}>
              <TreeNode node={child} onNodeClick={onNodeClick} scale={scale} />
            </g>
          </g>
        );
      })}
    </g>
  );
};

const RemixStats: React.FC<{ tree: RemixNode }> = ({ tree }) => {
  const countNodes = (node: RemixNode): number => {
    return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
  };

  const getMaxDepth = (node: RemixNode): number => {
    if (node.children.length === 0) return node.level;
    return Math.max(...node.children.map(child => getMaxDepth(child)));
  };

  const getTotalMints = (node: RemixNode): number => {
    return node.mints + node.children.reduce((sum, child) => sum + getTotalMints(child), 0);
  };

  const totalRemixes = countNodes(tree) - 1; // Exclude original
  const maxDepth = getMaxDepth(tree);
  const totalMints = getTotalMints(tree);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="pica-card p-4 text-center">
        <div className="text-xl font-semibold text-purple-400">{totalRemixes}</div>
        <div className="text-sm text-muted-foreground">Total Remixes</div>
      </div>
      <div className="pica-card p-4 text-center">
        <div className="text-xl font-semibold text-accent">{maxDepth}</div>
        <div className="text-sm text-muted-foreground">Max Depth</div>
      </div>
      <div className="pica-card p-4 text-center">
        <div className="text-xl font-semibold text-green-400">{totalMints}</div>
        <div className="text-sm text-muted-foreground">Total Mints</div>
      </div>
    </div>
  );
};

export const RemixTreeViewer: React.FC<RemixTreeViewerProps> = ({
  originalCampaign,
  className
}) => {
  const [selectedNode, setSelectedNode] = useState<RemixNode | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleNodeClick = (node: RemixNode) => {
    setSelectedNode(node);
    console.log('Selected remix node:', node.id);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.3));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const calculateTreeDimensions = (node: RemixNode): { width: number; height: number } => {
    const nodeWidth = 280;
    const nodeHeight = 120;
    const spacing = 60;
    
    const getWidth = (n: RemixNode): number => {
      if (n.children.length === 0) return nodeWidth;
      const childrenWidth = n.children.reduce((sum, child) => sum + getWidth(child), 0);
      const spacingWidth = (n.children.length - 1) * spacing;
      return Math.max(nodeWidth, childrenWidth + spacingWidth);
    };

    const getHeight = (n: RemixNode): number => {
      if (n.children.length === 0) return nodeHeight;
      return nodeHeight + 180 + Math.max(...n.children.map(child => getHeight(child)));
    };

    return {
      width: getWidth(node),
      height: getHeight(node)
    };
  };

  const { width: treeWidth, height: treeHeight } = calculateTreeDimensions(mockRemixTree);
  const viewBoxWidth = Math.max(800, treeWidth * scale);
  const viewBoxHeight = Math.max(600, treeHeight * scale);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-purple-400" />
            Remix Tree Viewer
          </h2>
          <p className="text-muted-foreground">
            Visualize how your content inspires others and creates derivative works
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <RemixStats tree={mockRemixTree} />

      {/* Tree Visualization */}
      <div className={`pica-card ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
        <div className="p-6">
          <div className="relative overflow-hidden bg-secondary/10 rounded-lg" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}>
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox={`${position.x} ${position.y} ${viewBoxWidth} ${viewBoxHeight}`}
              className="cursor-move"
            >
              <defs>
                <pattern
                  id="grid"
                  width={40 * scale}
                  height={40 * scale}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M ${40 * scale} 0 L 0 0 0 ${40 * scale}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={1}
                  />
                </pattern>
              </defs>
              
              {/* Grid background */}
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Tree */}
              <g transform={`translate(${(viewBoxWidth - treeWidth * scale) / 2}, 50)`}>
                <TreeNode
                  node={mockRemixTree}
                  onNodeClick={handleNodeClick}
                  scale={scale}
                />
              </g>
            </svg>

            {/* Scale indicator */}
            <div className="absolute top-4 left-4 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-sm">
              {Math.round(scale * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pica-card p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{selectedNode.title}</h3>
              <p className="text-muted-foreground">
                Created by {selectedNode.creator} • Level {selectedNode.level}
              </p>
            </div>
            <button className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold">{selectedNode.mints}</div>
              <div className="text-sm text-muted-foreground">Mints</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{selectedNode.children.length}</div>
              <div className="text-sm text-muted-foreground">Direct Remixes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {new Date(selectedNode.timestamp).toLocaleDateString()}
              </div>
              <div className="text-sm text-muted-foreground">Created</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="pica-card p-4">
        <h3 className="font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent/20 border border-accent/30 rounded"></div>
            <span>Original Campaign</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-400/20 border border-purple-400/30 rounded"></div>
            <span>Remix</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-purple-400/60"></div>
            <span>Remix Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
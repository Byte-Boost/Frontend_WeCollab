import * as React from 'react';
import { useState } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, Typography } from '@mui/material';
import { uploadArchive } from '@/scripts/http-requests/endpoints';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  cb?: () => void;
}

interface FolderTreeProps {
  nodes: TreeNode[];
}

const FolderTree: React.FC<FolderTreeProps> = ({ nodes }) => {
  const [draggedOverNodeId, setDraggedOverNodeId] = useState<string | null>(null);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>, node: TreeNode) => {
    event.preventDefault();
    setDraggedOverNodeId(null); // Reset the drag state
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      console.log(`Dropped files on ${node.label}:`, files);
      await uploadArchive(files[0], (node.id).replace('user-', '') as unknown as number);
      if (node.cb) node.cb(); // Call the callback to refresh the tree
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, node: TreeNode) => {
    event.preventDefault();
    setDraggedOverNodeId(node.id); // Set the drag state
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>, node: TreeNode) => {
    event.preventDefault();
    setDraggedOverNodeId(null); // Reset the drag state
  };

  const renderTree = (node: TreeNode) => (
    <TreeItem
      itemId={node.id}
      key={node.id}
      id={node.id}
      label={
        <div
          onDragOver={(event) => handleDragOver(event, node)}
          onDrop={(event) => handleDrop(event, node)}
          onDragLeave={(event) => handleDragLeave(event, node)}
          style={{
            border: draggedOverNodeId === node.id ? '1px dashed #000' : 'none',
            padding: '4px',
          }}
        >
          <Box display="flex" alignItems="center">
            {node.startIcon && <Box mr={1}>{node.startIcon}</Box>}
            <Typography>{node.label}</Typography>
            {node.endIcon && <Box ml={1}>{node.endIcon}</Box>}
          </Box>
        </div>
      }
      onClick={node.onClick}
    >
      {Array.isArray(node.children)
        ? node.children.map((childNode) => renderTree(childNode))
        : null}
    </TreeItem>
  );

  return (
    <SimpleTreeView aria-label="folder structure">
      {nodes.map((node) => renderTree(node))}
    </SimpleTreeView>
  );
};

export default FolderTree;
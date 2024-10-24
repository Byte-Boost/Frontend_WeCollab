import * as React from 'react';
import { useState } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, Typography } from '@mui/material';
import { uploadArchive } from '@/scripts/http-requests/endpoints';
import CrossIcon from '../icons/cross_icon';
import { User } from '@/models/models';
import { getSessionUser } from '@/scripts/utils/userService';
import DownloadIcon from '../icons/download';
import { confirmationAlert } from '@/scripts/utils/shared';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'area' | 'user' | 'archive';
  buttonAction?: () => void;
  buttonAction2?: () => void;
  cb?: () => void;
}

interface FolderTreeProps {
  nodes: TreeNode[];
}

const FolderTree: React.FC<FolderTreeProps> = ({ nodes }) => {
  const [draggedOverNodeId, setDraggedOverNodeId] = useState<string | null>(null);
  const [secUser, setSecUser] = useState<User | null>(null);

  React.useEffect(() => {
    async function fetchCurrentUser() {
      const user = await getSessionUser();
      setSecUser(user as unknown as User);
    }
    fetchCurrentUser();
  }, []);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>, node: TreeNode) => {
    event.preventDefault();
    setDraggedOverNodeId(null); // Reset the drag state
    const files = event.dataTransfer.files;
    if (files.length > 0 && secUser?.admin) {
      console.log(`Dropped files on ${node.label}:`, files);
      await uploadArchive(files[0], (node.id).replace('user-', '') as unknown as number);
      if (node.cb) node.cb(); // Call the callback to refresh the tree
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, node: TreeNode) => {
    event.preventDefault();
    setDraggedOverNodeId(node.id);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>, node: TreeNode) => {
    event.preventDefault();
    setDraggedOverNodeId(null);
  };

  const renderTree = (node: TreeNode) => (
    <TreeItem
      itemId={node.id}
      key={node.id}
      id={node.id}
      label={
        <div
          onDragOver={(event) => {
            if (node.type !== 'area') {
              handleDragOver(event, node)
            }
          }}
          onDrop={(event) => {
            if (node.type !== 'area') {
              handleDrop(event, node)
            }
          }}
          onDragLeave={(event) => {
            if (node.type !== 'area') {
              handleDragLeave(event, node)
            }
          }}
          style={{
            border: draggedOverNodeId === node.id ? '1px dashed #000' : 'none',
            borderRadius: '4px',
            padding: '4px',
            cursor: 'pointer',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
              {node.startIcon && <Box mr={1}>{node.startIcon}</Box>}
              <Typography>{node.label}</Typography>
              {node.endIcon && <Box ml={1}>{node.endIcon}</Box>}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              {node.type === 'archive' && (
                <Box mr={1}>
                  <div
                    onClick={() => {
                      if (node.buttonAction) node.buttonAction();
                      if (node.cb) node.cb();
                    }}
                    className="flex justify-center self-center items-center"
                  >
                    <DownloadIcon className="w-6 h-6" />
                  </div>
                </Box>
              )}
              {node.type === 'archive' && secUser?.admin && (
                <Box ml={1}>
                  <div
                    onClick={() =>
                      confirmationAlert('Certeza que deseja deletar o arquivo?', 'Delete archive', () => {
                        if (node.buttonAction2) node.buttonAction2();
                        if (node.cb) node.cb();
                      })
                    }
                    className="flex justify-center self-center items-center"
                  >
                    <CrossIcon className="w-5 h-5" />
                  </div>
                </Box>
              )}
            </Box>
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
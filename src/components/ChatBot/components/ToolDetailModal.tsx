import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

type ToolDetailModalProps = {
  open: boolean;
  onClose: () => void;
  toolName: string;
  toolDetails: Record<string, any>; // Use Record for better type inference
};

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ open, onClose, toolName, toolDetails }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{toolName}</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Tool Details:
        </Typography>
        <List>
          {Object.entries(toolDetails).map(([key, value]) => (
            <React.Fragment key={key}>
              <ListItem>
                <ListItemText
                  primary={key}
                  secondary={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Button onClick={onClose} color="primary" variant="contained" sx={{ marginTop: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDetailModal;

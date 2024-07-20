import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteMindMap } from './MindMapSlice';
import FlashCardDialog from './MindMapDialog';
import { useNavigate } from 'react-router-dom';

const MindMapList = () => {
  const maps = useSelector((state) => state.mindMaps.maps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteMindMap(id));
  };

  const handleItemClick = (item) => {
    setSelectedCard(item);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
  };

  const handleAddNewMindMap = () => {
    navigate('/create-new-mind-map');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        MindMap List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewMindMap}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        Add New Mind Map
      </Button>
      <List>
        {maps.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem button onClick={() => handleItemClick(item)}>
              <ListItemText
                primary={item.nodeData.topic}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      {selectedCard && (
        <div>
          <FlashCardDialog
            open={Boolean(selectedCard)}
            onClose={handleCloseDialog}
            current_id={selectedCard.id}
          />
          
        </div>
      )}
    </div>
  );
};

export default MindMapList;


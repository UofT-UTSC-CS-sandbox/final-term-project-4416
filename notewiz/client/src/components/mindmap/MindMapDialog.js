import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBottomNavigation from './BottomNav';
import {deleteMindMap, nextMindMap, prevMindMap } from './MindMapSlice';
import MindMapWindow from './MindMapWindow';
import axios from "axios";


const MindMapDialog = ({ open, onClose, current_id }) => {
  const [currentCardId, setCurrentCardId] = useState(current_id);
  const dispatch = useDispatch();
  const mindMaps = useSelector((state) => state.mindMaps.maps);
  const map = mindMaps[currentCardId];

  useEffect(() => {
    setCurrentCardId(current_id);
  }, [current_id]);

  async function autoSave (e){
    onClose();
  }


  const handleNextCard = () => {
    dispatch(nextMindMap());
    setCurrentCardId((prevId) => (prevId + 1) % mindMaps.length);
  };

  const handlePrevCard = () => {
    dispatch(prevMindMap());
    setCurrentCardId((prevId) => (prevId - 1 + mindMaps.length) % mindMaps.length);
  };

  if (!map) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{map.content.nodeData.topic}</DialogTitle>
      <DialogContent>
        <div>
          <MindMapWindow input={map} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={autoSave}>Close</Button>
      </DialogActions>
      <SimpleBottomNavigation nextCard={handleNextCard} prevCard={handlePrevCard} />
    </Dialog>
  );
};

export default MindMapDialog;


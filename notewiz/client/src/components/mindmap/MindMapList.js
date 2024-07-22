import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
    Typography,
    Button,
    Fab, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteMindMap, DeleteMindMapThunk, fetchMindMapSetThunk} from './MindMapSlice';
import FlashCardDialog from './MindMapDialog';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MindMapList = () => {
  const maps = useSelector((state) => state.mindMaps.maps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);


    const fetchMindMap = async ()=>{
        try{
            await dispatch(fetchMindMapSetThunk());
        }catch (e) {
            console.log(e)
        }
    }
    useEffect( () => {
        fetchMindMap();
    }, [dispatch]);

    async function handleDelete(id){
        try{
            await dispatch(DeleteMindMapThunk(id));
            const response = await axios.post("http://localhost:5000/api/deleteMindMap", {id},{withCredentials: true});
            await fetchMindMap();

        }catch (e) {
            console.log(e)
        }
    }
    // const handleDelete = (id) => {
  //   dispatch(deleteMindMap(id));
  // };

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
        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            <Typography variant="h4" gutterBottom>
                MindMap List
            </Typography>
            <Fab size="small" aria-label="add" onClick={handleAddNewMindMap} className='AddIcon'>
                <AddCircleOutlineIcon />
            </Fab>
        </Box>
      <List>
        {maps.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem button onClick={() => handleItemClick(item)}>
              <ListItemText
                  primary={
                      <Typography variant="h6">
                          {item.content?.nodeData.topic || ''}
                      </Typography>
                  }
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


import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteFlashCardThunk, fetchFlashCardSetThunk} from './FlashCardSlice';
import FlashCardDialog from './FlashCardDialog';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Box, Fab } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const FlashCardList = () => {

  const flashCards = useSelector((state) => state.flashCards.cards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

    const fetchNode = async ()=>{
        try{
            await dispatch(fetchFlashCardSetThunk());
        }catch (e) {
            console.log(e)
        }
    }
    useEffect( () => {
        fetchNode();
    }, [dispatch]);

    async function handleDelete(id){
        try{
            await dispatch(DeleteFlashCardThunk(id));
            const response = await axios.post("http://localhost:8000/api/deleteFlashCard", {id},{withCredentials: true});
            await fetchNode();

        }catch (e) {
            console.log(e)
        }
    }

  const handleItemClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
  };

  const handleAddNewFlashCard = () => {
    navigate('/create-new-flashcard');
  };

  return (
    <div>
        <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            <Typography variant="h4" gutterBottom>
                FlashCard List
            </Typography>
            <Fab size="small" aria-label="add" onClick={handleAddNewFlashCard} className='AddIcon'>
                <AddCircleOutlineIcon />
            </Fab>
        </Box>
      <List>
        {flashCards.map((card) => (
          <React.Fragment key={card.id}>
            <ListItem button onClick={() => handleItemClick(card)}>
              <ListItemText
                  primary={card.front?.title || ''}
                  secondary={card.front?.content || ''}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(card.id)}>
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

export default FlashCardList;


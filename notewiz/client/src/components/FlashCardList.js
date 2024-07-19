import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteFlashCardThunk, fetchFlashCardSetThunk} from './FlashCardSlice';
import FlashCardDialog from './FlashCardDialog';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
            const response = await axios.post("http://localhost:5000/api/deleteFlashCard", {id});
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
      <Typography variant="h4" gutterBottom onClick={()=>navigate('/create-new-flashcard')}>
        FlashCard List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewFlashCard}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        Add New Flash Card
      </Button>
      <List>
        {flashCards.map((card) => (
          <React.Fragment key={card.id}>
            <ListItem onClick={() => handleItemClick(card)}>
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


import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Flip from 'react-card-flip';
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBottomNavigation from './BottomNav';
import { deleteFlashCard, nextFlashCard, prevFlashCard } from './FlashCardSlice';

const StyledCard = styled(Card)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    color: '#EEEEEE',
    background:
      'radial-gradient(circle at 17% 1%, rgba(198, 198, 198,0.03) 0%, rgba(198, 198, 198,0.03) 50%,rgba(42, 42, 42,0.03) 50%, rgba(42, 42, 42,0.03) 100%),radial-gradient(circle at 8% 81%, rgba(253, 253, 253,0.03) 0%, rgba(253, 253, 253,0.03) 50%,rgba(36, 36, 36,0.03) 50%, rgba(36, 36, 36,0.03) 100%),radial-gradient(circle at 83% 29%, rgba(164, 164, 164,0.03) 0%, rgba(164, 164, 164,0.03) 50%,rgba(60, 60, 60,0.03) 50%, rgba(60, 60, 60,0.03) 100%),radial-gradient(circle at 96% 62%, rgba(170, 170, 170,0.03) 0%, rgba(170, 170, 170,0.03) 50%,rgba(169, 169, 169,0.03) 50%, rgba(169, 169, 169,0.03) 100%),linear-gradient(338deg, rgb(2, 141, 213),rgb(5, 172, 81))'
  },
  '& .MuiCardContent-root': {
    background:
      'linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 50%,rgba(169, 169, 169,0.04) 50%, rgba(169, 169, 169,0.04) 71%,rgba(251, 251, 251,0.04) 71%, rgba(251, 251, 251,0.04) 100%), linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 56%,rgba(169, 169, 169,0.04) 56%, rgba(169, 169, 169,0.04) 67%,rgba(251, 251, 251,0.04) 67%, rgba(251, 251, 251,0.04) 100%), linear-gradient(135deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 4%,rgba(169, 169, 169,0.04) 4%, rgba(169, 169, 169,0.04) 75%,rgba(251, 251, 251,0.04) 75%, rgba(251, 251, 251,0.04) 100%), linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))',
    color: '#EEEEEE',
    minHeight: '25vh'
  },
  '& .MuiButtonBase-root': {
    color: 'white'
  },
  '& .MuiCardHeader-action': {
    alignSelf: 'auto',
    marginTop: 0,
    marginLeft: 8
  }
}));

const FlashCardDialog = ({ open, onClose, current_id }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(current_id);
  const dispatch = useDispatch();
  const flashCards = useSelector((state) => state.flashCards.cards);
  const card = flashCards[currentCardId];

  useEffect(() => {
    setCurrentCardId(current_id);
  }, [current_id]);

  const handleDelete = () => {
    dispatch(deleteFlashCard(currentCardId));
    onClose();
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    dispatch(nextFlashCard());
    setCurrentCardId((prevId) => (prevId + 1) % flashCards.length);
    setIsFlipped(false);
  };

  const handlePrevCard = () => {
    dispatch(prevFlashCard());
    setCurrentCardId((prevId) => (prevId - 1 + flashCards.length) % flashCards.length);
    setIsFlipped(false);
  };

  if (!card) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>FlashCard</DialogTitle>
      <DialogContent>
        <Flip isFlipped={isFlipped} flipDirection="vertical">
          <StyledCard elevation={24} key="front" onClick={handleFlip}>
            <CardHeader
              action={
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              }
              title={card.front.title}
            />
            <CardContent>{card.front.content}</CardContent>
          </StyledCard>

          <StyledCard key="back" elevation={24} onClick={handleFlip}>
            <CardHeader
              action={
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              }
              title={card.back.title}
            />
            <CardContent>{card.back.content}</CardContent>
          </StyledCard>
        </Flip>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <SimpleBottomNavigation nextCard={handleNextCard} prevCard={handlePrevCard} />
    </Dialog>
  );
};

export default FlashCardDialog;


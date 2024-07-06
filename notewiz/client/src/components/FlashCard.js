import React from 'react';
import Flip from 'react-card-flip';
import { useDispatch, useSelector } from 'react-redux';
import { flipFlashCard, deleteFlashCard } from './FlashCardSlice';
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledCard = styled(Card)(({ theme }) => ({
  "& .MuiCardHeader-root": {
    color: "#EEEEEE",
    background: "radial-gradient(circle at 17% 1%, rgba(198, 198, 198,0.03) 0%, rgba(198, 198, 198,0.03) 50%,rgba(42, 42, 42,0.03) 50%, rgba(42, 42, 42,0.03) 100%),radial-gradient(circle at 8% 81%, rgba(253, 253, 253,0.03) 0%, rgba(253, 253, 253,0.03) 50%,rgba(36, 36, 36,0.03) 50%, rgba(36, 36, 36,0.03) 100%),radial-gradient(circle at 83% 29%, rgba(164, 164, 164,0.03) 0%, rgba(164, 164, 164,0.03) 50%,rgba(60, 60, 60,0.03) 50%, rgba(60, 60, 60,0.03) 100%),radial-gradient(circle at 96% 62%, rgba(170, 170, 170,0.03) 0%, rgba(170, 170, 170,0.03) 50%,rgba(169, 169, 169,0.03) 50%, rgba(169, 169, 169,0.03) 100%),linear-gradient(338deg, rgb(2, 141, 213),rgb(5, 172, 81))"
  },
  "& .MuiCardContent-root": {
    background: "linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 50%,rgba(169, 169, 169,0.04) 50%, rgba(169, 169, 169,0.04) 71%,rgba(251, 251, 251,0.04) 71%, rgba(251, 251, 251,0.04) 100%), linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 56%,rgba(169, 169, 169,0.04) 56%, rgba(169, 169, 169,0.04) 67%,rgba(251, 251, 251,0.04) 67%, rgba(251, 251, 251,0.04) 100%), linear-gradient(135deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 4%,rgba(169, 169, 169,0.04) 4%, rgba(169, 169, 169,0.04) 75%,rgba(251, 251, 251,0.04) 75%, rgba(251, 251, 251,0.04) 100%), linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))",
    color: "#EEEEEE",
    minHeight: "25vh"
  },
  "& .MuiButtonBase-root": {
    color: "white"
  },
  "& .MuiCardHeader-action": {
    alignSelf: "auto",
    marginTop: 0,
    marginLeft: 8
  }
}));

const FlashCard = ({ id, front, back }) => {
  const dispatch = useDispatch();
  const { flipped } = useSelector((state) => state.flashCards);

  return (
    <div id={`${id + 1}`}>
      <Flip isFlipped={flipped} flipDirection="vertical">
        <StyledCard
          elevation={24}
          key="front"
          onClick={() => dispatch(flipFlashCard())}
        >
          <CardHeader
            action={
              <IconButton
                aria-label="delete"
                onClick={() => dispatch(deleteFlashCard())}
              >
                <DeleteIcon />
              </IconButton>
            }
            title={front.title}
          />
          <CardContent>{front.content}</CardContent>
        </StyledCard>

        <StyledCard
          key="back"
          elevation={24}
          onClick={() => dispatch(flipFlashCard())}
        >
          <CardHeader
            action={
              <IconButton
                aria-label="delete"
                onClick={() => dispatch(deleteFlashCard())}
              >
                <DeleteIcon />
              </IconButton>
            }
            title={back.title}
          />
          <CardContent>{back.content}</CardContent>
        </StyledCard>
      </Flip>
    </div>
  );
};

export default FlashCard;


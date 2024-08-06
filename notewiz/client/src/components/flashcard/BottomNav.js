import React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PreviousIcon from "@mui/icons-material/ArrowBackIos";
import NextIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/AddToPhotos";
import CancelIcon from "@mui/icons-material/Cancel";

const DisplayModeNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "relative",
  width: "100%",
  margin: "auto",
}));

const CreateModeNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "relative",
  width: "100%",
  margin: "auto",
}));

export default function SimpleBottomNavigation({ prevCard, nextCard }) {
  const navigate = useNavigate();

  return (
    <>
      {!prevCard && ( // if no props are passed, we are in create mode
        <CreateModeNavigation showLabels>
          <BottomNavigationAction
            label="Cancel"
            icon={<CancelIcon />}
            onClick={() => navigate(-1)}
          />
        </CreateModeNavigation>
      )}
      {prevCard && ( // if props exist, we are in display mode
        <DisplayModeNavigation showLabels>
          <BottomNavigationAction
            label="Previous"
            icon={<PreviousIcon />}
            onClick={prevCard}
          />
          <BottomNavigationAction
            label="New Card"
            icon={<AddIcon />}
            onClick={() => navigate("/create-new-flashcard")}
          />
          <BottomNavigationAction
            label="Next"
            icon={<NextIcon />}
            onClick={nextCard}
          />
        </DisplayModeNavigation>
      )}
    </>
  );
}


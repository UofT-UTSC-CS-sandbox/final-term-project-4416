import React, { useState } from "react";
import Flip from "react-card-flip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { flipFlashCard, createFlashCard } from "./FlashCardSlice";


import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Grid,
  TextField,
  Typography
} from "@mui/material";

import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import {notifySuccess} from "./ToastNotification";

const StyledCard = styled(Card)(({ theme }) => ({
  "& .MuiCardHeader-root": {
    background:
      "radial-gradient(circle at 17% 1%, rgba(198, 198, 198,0.03) 0%, rgba(198, 198, 198,0.03) 50%,rgba(42, 42, 42,0.03) 50%, rgba(42, 42, 42,0.03) 100%),radial-gradient(circle at 8% 81%, rgba(253, 253, 253,0.03) 0%, rgba(253, 253, 253,0.03) 50%,rgba(36, 36, 36,0.03) 50%, rgba(36, 36, 36,0.03) 100%),radial-gradient(circle at 83% 29%, rgba(164, 164, 164,0.03) 0%, rgba(164, 164, 164,0.03) 50%,rgba(60, 60, 60,0.03) 50%, rgba(60, 60, 60,0.03) 100%),radial-gradient(circle at 96% 62%, rgba(170, 170, 170,0.03) 0%, rgba(170, 170, 170,0.03) 50%,rgba(169, 169, 169,0.03) 50%, rgba(169, 169, 169,0.03) 100%),linear-gradient(338deg, rgb(2, 141, 213),rgb(5, 172, 81))"
  },
  "& .MuiCardContent-root": {
    background:
      "linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 50%,rgba(169, 169, 169,0.04) 50%, rgba(169, 169, 169,0.04) 71%,rgba(251, 251, 251,0.04) 71%, rgba(251, 251, 251,0.04) 100%), linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 56%,rgba(169, 169, 169,0.04) 56%, rgba(169, 169, 169,0.04) 67%,rgba(251, 251, 251,0.04) 67%, rgba(251, 251, 251,0.04) 100%), linear-gradient(135deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 4%,rgba(169, 169, 169,0.04) 4%, rgba(169, 169, 169,0.04) 75%,rgba(251, 251, 251,0.04) 75%, rgba(251, 251, 251,0.04) 100%), linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))",
    color: "#EEEEEE",
    minHeight: "25vh"
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255, 0.5)"
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EEEEEE"
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFFFFF"
  },
  "& .MuiOutlinedInput-root": {
    color: "#EEEEEE"
  },
  "& .MuiInputLabel-root": {
    color: "#EEEEEE"
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

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const { flipped } = useSelector(state => state.flashCards);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    frontTitle: "",
    frontContent: "",
    backTitle: "",
    backContent: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.frontContent || formData.frontContent.length < 1) {
      newErrors.frontContent = "You must write at least 1 word at Front Content";
    }
    if (!formData.backContent || formData.backContent.length < 1) {
      newErrors.backContent = "You must write at least 1 word at Back Content";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit (e) {
    e.preventDefault();
    const formErrors = validateForm();
    console.log("formErrors", formErrors);
    console.log(formData);
    if (Object.keys(formErrors).length === 0) {
      try {
        notifySuccess("Successfully Created");
        dispatch(createFlashCard(formData));
        const response = await axios.post("http://localhost:5000/api/createFlashCard", formData, {withCredentials: true});
      } catch (err) {
        console.log(err);
      }
    }else{
      setErrors(formErrors);
    }
  }

  const handleCancel = () => {
    navigate('/Flash');
  };

  const preventFlip = (e) => e.stopPropagation();

  return (
    <Grid item xs={10} sm={8} md={6} xl={4}>
      <form onSubmit={(e)=>{handleSubmit(e);
      }}>
        <Flip isFlipped={flipped} flipDirection="vertical">
          <StyledCard
            key="front"
            elevation={24}
            onClick={() => dispatch(flipFlashCard())}
          >
            <CardHeader
              action={
                <><IconButton
                  type="submit"
                  aria-label="submit"
                  onClick={preventFlip}
                >
                  <CheckCircleIcon />
                </IconButton><IconButton
                  aria-label="cancel"
                  onClick={handleCancel}
                >
                    <CancelIcon />
                  </IconButton></>
              }
              title={
                <TextField
                  fullWidth
                  multiline
                  label="Front Title"
                  variant="outlined"
                  name="frontTitle"
                  value={formData.frontTitle}
                  onChange={handleInputChange}
                  onClick={preventFlip}
                  inputProps={{ maxLength: 40 }}
                />
              }
            />
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Front Content"
                variant="outlined"
                name="frontContent"
                value={formData.frontContent}
                onChange={handleInputChange}
                onClick={preventFlip}
                error={!!errors.frontContent}
                helperText={errors.frontContent}
                inputProps={{ maxLength: 1000 }}
              />
            </CardContent>
          </StyledCard>
          <StyledCard
            key="back"
            elevation={24}
            onClick={() => dispatch(flipFlashCard())}
          >
            <CardHeader
              action={
                <><IconButton
                  type="submit"
                  aria-label="submit"
                  onClick={preventFlip}
                >
                  <CheckCircleIcon />
                </IconButton><IconButton
                  aria-label="cancel"
                  onClick={handleCancel}
                >
                    <CancelIcon />
                  </IconButton>
                </>
              }
              title={
                <TextField
                  fullWidth
                  multiline
                  label="Back Title"
                  variant="outlined"
                  name="backTitle"
                  value={formData.backTitle}
                  onChange={handleInputChange}
                  onClick={preventFlip}
                  inputProps={{ maxLength: 40 }}
                />
              }
            />
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Back Content"
                variant="outlined"
                name="backContent"
                value={formData.backContent}
                onChange={handleInputChange}
                onClick={preventFlip}
                error={!!errors.backContent}
                helperText={errors.backContent}
                inputProps={{ maxLength: 1000 }}
              />
            </CardContent>
          </StyledCard>
        </Flip>
      </form>
    </Grid>
  );
};

export default CreateFlashCard;


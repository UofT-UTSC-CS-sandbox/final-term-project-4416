import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function fetchFlashCardSet() {
  let response;
  response = await axios.get("http://localhost:5000/api/fetchFlashCardSet");
  return response.data;
}

export const fetchFlashCardSetThunk = createAsyncThunk(
    'flashCards/fetchFlashCardSet',
    async () => {
      try {
        const cards = await fetchFlashCardSet();
        return cards ?? [];
      } catch (error) {
        console.error('Error fetching flashcard set:', error);
        return [];
      }
    }
);

const flashCards = createSlice({
  name: "flashCards",
  initialState: {
    current: 0, // index of current visible card
    flipped: false,
    cards: [],
  },
  reducers: {
    nextFlashCard: state => {
      console.log(state.current, state.cards.length);
      if (state.current < state.cards.length - 1) {
        if (state.flipped) flashCards.caseReducers.flipFlashCard(state); // call a caseReducer from within a caseReducer
        state.current++; // Mutative code is possible thanks to immer running under the hood
      }
    },
    prevFlashCard: state => {
      if (state.current !== 0) {
        if (state.flipped) flashCards.caseReducers.flipFlashCard(state);
        state.current--;
      }
    },
    flipFlashCard: state => {
      state.flipped = !state.flipped;
    },
    createFlashCard: (state, action) => {
      action.payload.id = state.cards.length + 1;
      state.cards.push(action.payload); // Flux Standard Actions convention suggests we always call it payload. With RTK you have no choice.
      state.current = state.cards.length - 1; // set the new card visible immediately
    },
    // See if you can implement this somewhere in the program by adding an edit button to each card!
    updateFlashCard: (state, action) => {
      const { index, updatedCardInfo } = action.payload;
      state.cards[index] = updatedCardInfo;
    },
    // deleteFlashCard: state => {
    //   // if (state.cards.length === 1) return; // If there's only one card, don't allow it to be deleted
    //   if (!state.flipped) flashCards.caseReducers.flipFlashCard(state); // Ensure front of card is displayed when we change cards
    //   if (state.cards.length - 1 === state.current) {
    //     // If looking at the last card, move back 1 card before deleting so we don't reference an undefined array position
    //     state.current--;
    //     state.cards.splice(state.current + 1, 1);
    //   } else {
    //     state.cards.splice(state.current, 1);
    //   }
    // }
    deleteFlashCard: state => {
      if (state.cards.length === 0) return; // If there are no cards, do nothing

      if (!state.flipped) {
        flashCards.caseReducers.flipFlashCard(state); // Ensure front of card is displayed when we change cards
      }

      if (state.cards.length - 1 === state.current) {
        // If looking at the last card, move back 1 card before deleting so we don't reference an undefined array position
        state.cards.splice(state.current, 1);
        if (state.current > 0) {
          state.current--;
        }
      } else {
        state.cards.splice(state.current, 1);
      }

      if (state.current >= state.cards.length) {
        // Ensure the current index is within the bounds of the array
        state.current = state.cards.length - 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFlashCardSetThunk.fulfilled, (state, action) => {
      state.cards = action.payload; // Update the state with fetched cards
    });
    builder.addCase(fetchFlashCardSetThunk.rejected, (state, action) => {
      console.error('Fetch flashcard set failed:', action.error);
      state.cards = []; // Ensure the state is still set to an empty array on error
    });
  },
});

export const {
  nextFlashCard,
  prevFlashCard,
  flipFlashCard,
  createFlashCard,
  updateFlashCard,
  deleteFlashCard
} = flashCards.actions;
export default flashCards.reducer;

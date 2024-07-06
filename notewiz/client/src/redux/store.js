import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flashCardsReducer from '../components/FlashCardSlice';

const rootReducer = combineReducers({
  flashCards: flashCardsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
export const RootState = store.getState();
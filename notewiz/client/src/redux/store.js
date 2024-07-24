import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flashCardsReducer from '../components/FlashCardSlice';
import mindMapReducer from '../components/mindmap/MindMapSlice';

const rootReducer = combineReducers({
  flashCards: flashCardsReducer,
  mindMaps: mindMapReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
export const RootState = store.getState();
import FlashCardComponent from './FlashCard';
import SimpleBottomNavigation from './BottomNav';
import {
  nextFlashCard,
  prevFlashCard
} from "./FlashCardSlice"
import { useSelector, useDispatch } from "react-redux"

const FlashCardsView = () => {

  const dispatch = useDispatch()
  const cards = useSelector((state) => state.flashCards.cards)
  const current = useSelector((state) => state.flashCards.current)

  return (
    <div>
      <h1>Flash Cards</h1>
      <SimpleBottomNavigation
        nextCard={() => dispatch(nextFlashCard())}
        prevCard={() => dispatch(prevFlashCard())}
      />
      <FlashCardComponent id={current} front={cards[current].front} back={cards[current].back} />
    </div>
  );
};

export { FlashCardsView };

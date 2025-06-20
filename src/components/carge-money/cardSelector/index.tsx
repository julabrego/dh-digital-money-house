"use client";
import Typography from "@/components/common/Typography";
import { Card } from "@/types/card.types";
import CardOption from "./CardOption";

type CardsListProps = {
  cards: Card[];
  selectedCard: number | null;
  onSelectCard: (id: number) => void;
};

const CardSelector = ({ cards, onSelectCard, selectedCard }: CardsListProps) => {
  if (cards.length === 0)
    return (
      <div className="pt-[16px]">
        <Typography type={"text2"}>Aún no tienes tarjetas asociadas</Typography>
      </div>
    );

  return (
    <>
      {cards.map((card) => (
        <CardOption
          key={card.id}
          id={card.id}
          number={card.number_id}
          onSelectCard={onSelectCard}
          selected={selectedCard === card.id}
        />
      ))}
    </>
  );
};

export default CardSelector;

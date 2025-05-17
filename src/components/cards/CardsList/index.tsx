"use client";
import Typography from "@/components/common/Typography";
import { Card } from "@/types/card.types";
import CardEntry from "../CardEntry";

type CardsListProps = {
  cards: Card[];
};

const CardsList = ({ cards }: CardsListProps) => {
  console.log({cards})
  if (cards.length === 0)
    return (
      <div className="pt-[16px]">
        <Typography type={"text2"}>Aún no tienes tarjetas asociadas</Typography>
      </div>
    );

  return cards.map((card) => (
    <CardEntry key={card.id} id={card.id} status={"success"} number={card.number_id} />
  ));
};

export default CardsList;

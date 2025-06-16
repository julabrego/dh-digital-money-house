"use client";
import CardSelector from "@/components/carge-money/cardSelector";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import PATHS from "@/config/routing/paths";
import { Card as CardType } from "@/types/card.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type ChargeMoneyCardViewProps = {
  cards: CardType[];
};

const ChargeMoneyCardView = ({ cards }: ChargeMoneyCardViewProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSelectCard = (id: number) => setSelectedCard(id);

  return (
    <Card mode="dark">
      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <Typography type={"heading4"}>Seleccionar tarjeta</Typography>
      </article>

      <Card mode="white">
        <CardSelector
          cards={cards}
          selectedCard={selectedCard}
          onSelectCard={handleSelectCard}
        />
      </Card>

      <Link href={PATHS.CARDS_NEW}>
        <div className="w-full flex flex-row justify-between pt-[16px]">
          <div className="flex w-full flex-row gap-[16px] items-center ">
            <Image
              src="/images/plus-circle-green.svg"
              alt="Nueva tarjeta"
              width={33}
              height={33}
              className="w-[33px] h-[33px]"
            />
            <Typography type={"heading3"} className="text-primary">
              Nueva tarjeta
            </Typography>
          </div>
          <Button mode="primary" disabled={!selectedCard}>Continuar</Button>
        </div>
      </Link>
    </Card>
  );
};

export default ChargeMoneyCardView;

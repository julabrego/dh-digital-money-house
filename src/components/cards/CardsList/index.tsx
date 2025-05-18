"use client";
import Typography from "@/components/common/Typography";
import { useHeadersContext } from "@/contexts/headers.context";
import cardsApi from "@/services/cards/cards.api";
import { Card } from "@/types/card.types";
import { useState } from "react";
import CardEntry from "../CardEntry";

type CardsListProps = {
  cards: Card[];
};

const CardsList = ({ cards }: CardsListProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { accountId, token } = useHeadersContext();

  const handleDelete = async (id: number) => {
    setServerError(null);
    setIsDeleting(true);

    try {
      await cardsApi.deleteCard(String(id), {
        accountId: accountId!,
        token: token!,
      });

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrio un error inesperado");
      }
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <article className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center">
        <div className="grow items-center">Cargando...</div>
      </article>
    );
  }

  if (cards.length === 0)
    return (
      <div className="pt-[16px]">
        <Typography type={"text2"}>Aún no tienes tarjetas asociadas</Typography>
      </div>
    );

  return (
    <>
      {cards.map((card) => (
        <CardEntry
          key={card.id}
          id={card.id}
          status={"success"}
          number={card.number_id}
          handleDelete={handleDelete}
        />
      ))}
      {serverError && (
        <div className="text-[12px] text-right text-error">{serverError}</div>
      )}
    </>
  );
};

export default CardsList;

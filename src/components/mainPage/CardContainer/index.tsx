const CardsContainer = ({ cards }: { cards: CardType[] }) => {
  return (
    <article className="translate-y-[100px] lg:translate-y-[150px] cards-container bg-primary px-4 rounded-t-[20px]">
      <div className="translate-y-[-64px] lg:translate-y-[-120px] flex flex-col lg:flex-row justify-center items-center gap-[16px]">
        {cards.map((card: CardType, i) => (
          <Card
            key={`card-${card.title}-${i}`}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </article>
  );
};

const Card = ({ title, text }: CardType) => {
  return (
    <article className="bg-white flex flex-col p-4 md:p-5 rounded-[20px] max-w-[597px] lg:h-[246px]">
      <h1 className="border-b-primary border-b-2 pt-0 pb-[12px] mb-[12px] text-[24px] md:text-[40px] font-bold text-background ">
        {title}
      </h1>
      <p className="text-[16px] md:text-[20px] text-background ">{text}</p>
    </article>
  );
};

type CardType = { title: string; text: string };

export default CardsContainer;

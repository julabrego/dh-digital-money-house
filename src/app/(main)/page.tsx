import React from "react";

const cards = [
  {
    title: "Tranferí dinero",
    text: "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como tambien recibir transferencias y nuclear tu capital en nuestra billetera virtual.",
  },
  {
    title: "Pago de servicios",
    text: "Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel.",
  },
];

const HomePage = () => {
  return (
    <main className="h-screen">
      <div className="home-background-image" />
      <section className="absolute top-0 left-0 w-full h-[calc(100%-128px)] flex flex-col justify-between">
        <HeroText
          title="De ahora en adelante hacés más con tu dinero"
          subtitle="Tu nueva"
          strongSubtitle="billetera virtual"
        />
        <CardsContainer cards={cards} />
      </section>
    </main>
  );
};

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
      <h1>{title}</h1>
      <p>{text}</p>
    </article>
  );
};

type CardType = { title: string; text: string };

const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  strongSubtitle,
}) => {
  return (
    <div className="hero-text">
      <h1>{title}</h1>
      <Dash />
      <h2>
        {subtitle}{" "}
        {strongSubtitle && (
          <>
            <br className="md:hidden" />
            <strong>{strongSubtitle}</strong>
          </>
        )}
      </h2>
    </div>
  );
};

type HeroTextProps = {
  title: string;
  subtitle: string;
  strongSubtitle?: string;
};

const Dash = () => {
  return <div className="w-[25px] h-[4px] bg-primary md:hidden" />;
};

export default HomePage;

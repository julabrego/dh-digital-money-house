import CardsContainer from "@/components/mainPage/CardContainer";
import HeroText from "@/components/mainPage/HeroText";
import React from "react";

const HomePage = () => {
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

  return (
    <main className="h-screen w-full">
      <div className="background-image bg-[url('/images/background-landing-mb.jpg')] md:bg-[url('/images/background-landing.jpg')] " />
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

export default HomePage;

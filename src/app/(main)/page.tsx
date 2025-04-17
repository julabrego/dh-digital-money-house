import React from "react";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full mt-16 mb-16">
      <HeroText
        title="De ahora en adelante hacés más con tu dinero"
        subtitle="Tu nueva"
        strongSubtitle="billetera virtual"
      />
      <BackgroundImage />
    </div>
  );
};

const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  strongSubtitle,
}) => {
  return (
    <div className="HeroText absolute z-10 px-4">
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

const BackgroundImage = () => {
  return (
    <div className="h-screen w-full bg-cover bg-center bg-no-repeat absolute bg-[url('/images/background-landing-mb.jpg')] md:bg-[url('/images/background-landing.jpg')]"></div>
  );
};

const Dash = () => {
  return <div className="w-[25px] h-[4px] bg-primary md:hidden" />;
};

export default HomePage;

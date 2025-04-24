import React from "react";

const HomePage = () => {
  return (
    <div className="home-background-image">
      <HeroText
        title="De ahora en adelante hacés más con tu dinero"
        subtitle="Tu nueva"
        strongSubtitle="billetera virtual"
      />
    </div>
  );
};

const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  strongSubtitle,
}) => {
  return (
    <div className="hero-text absolute z-10 px-4">
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

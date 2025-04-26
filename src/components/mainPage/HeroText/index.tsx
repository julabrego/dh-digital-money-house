const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  strongSubtitle,
}) => {
  return (
    <div className="mt-12 md:mt-16 pt-8 px-4 flex flex-col w-[260px] md:w-[460px] gap-4 ">
      <h1 className="font-semibold md:font-normal leading-[28px] md:leading-[50px] text-white text-[24px] md:text-[50px]">
        {title}
      </h1>
      <Dash />
      <h2 className="text-primary text-[21.5px] md:text-[34px] leading-[28px] md:leading-[50px] ">
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

export default HeroText;

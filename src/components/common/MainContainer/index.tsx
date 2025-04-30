import React, { PropsWithChildren } from "react";

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full flex justify-center pt-4 pb-4">{children}</main>
  );
};

export default MainContainer;

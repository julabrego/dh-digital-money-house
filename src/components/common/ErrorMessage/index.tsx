import React from "react";

const ErrorMessage: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p className="error-message text-center">{children}</p>;
};

export default ErrorMessage;

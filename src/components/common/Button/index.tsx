import React from "react";

const Button: React.FC<ButtonProps> = ({
  children,
  mode = "primary",
  size = "medium",
}) => {
  return (
    <button className={`button-${mode} button-${size}`}>{children}</button>
  );
};

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  mode?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
};

export default Button;

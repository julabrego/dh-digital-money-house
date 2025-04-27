import React from "react";

const Button: React.FC<ButtonProps> = ({
  children,
  mode = "primary",
  size = "medium",
  onClick,
}) => {
  return (
    <button className={`button-${mode} button-${size}`} onClick={onClick}>
      {children}
    </button>
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

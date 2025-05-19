import React from "react";

const Button: React.FC<ButtonProps> = ({
  children,
  mode = "primary",
  size = "medium",
  onClick,
  className,
  ...rest
}) => {
  return (
    <button className={`button-${mode} button-${size} ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  mode?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large" | "xlarge";
};

export default Button;

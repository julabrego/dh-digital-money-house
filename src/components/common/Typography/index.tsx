import { PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren & {
  type:
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "text1"
    | "text2"
    | "error";
  className?: string;
};

const headingComponents = {
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
} as const;

const Typography = ({ children, type, className }: TypographyProps) => {
  const Component =
    headingComponents[type as keyof typeof headingComponents] || "span";

  return <Component className={type}>{children}</Component>;
};

export default Typography;

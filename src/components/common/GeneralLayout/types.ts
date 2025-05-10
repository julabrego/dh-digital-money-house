export type GeneralLayoutProps = React.PropsWithChildren & {
  mode?: GeneralLayoutMode;
  headerMenuButtons?: React.ReactNode | (() => React.ReactNode);
};

export type GeneralLayoutMode = "dark" | "light";


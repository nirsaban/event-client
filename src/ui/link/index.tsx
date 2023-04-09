import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

type Props = {
  text: string;
  to: string;
  label: string;
};

export const LinkTo: React.FC<Props> = ({ to, text, label }: Props): ReactElement => {
  return (
    <>
      <span>{text + " "}</span>
      <NavLink to={to}>{label}</NavLink>;
    </>
  );
};

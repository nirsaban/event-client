import { Fragment, ReactNode } from "react";

type UIFormProps = {
  title: string;
  children: Array<ReactNode>;
};

export const UIForm = (props: UIFormProps): JSX.Element => {
  return (
    <Fragment>
      <h3>{props.title}</h3>
      <form>{props.children}</form>
    </Fragment>
  );
};

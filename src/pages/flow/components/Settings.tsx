import { ChangeEventHandler, useState } from "react";
import {
  ConfirmDetailsProps,
  InputFlow,
  InputFlowGroup,
} from "../../../common/types/interface/flow.interface";
import { UIInput } from "../../../ui/input";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { UsersEntity } from "../../../common/types/entites/user.entity";
import { RootState } from "../../../redux/store";
import { Button } from "@mui/material";
import { InputDate } from "../../../ui/input/inputDate";

export enum EventTypeEnum {
  "weeding" = "weeding",
  "other" = "other",
}
export enum RollEnum {
  bride = "bride",
  groom = "groom",
}

const inputs = [
  {
    name: "guestAmount",
    type: "number",
    label: "Guest's Amount",
    placeholder: "Enter guests amount",
  },
  {
    name: "maxBudget",
    type: "number",
    label: "Maximum Budget",
    placeholder: "Enter guests amount",
  },
  {
    name: "reserve",
    type: "number",
    label: "Reserve sits amount",
    placeholder: "Enter guests amount",
  },
  {
    name: "tableSits",
    type: "number",
    label: "Table sits amount",
    placeholder: "12..",
  },
  {
    name: "knightsTableSits",
    type: "number",
    label: "knights Table  sits amount",
    placeholder: "25..",
  },
] as unknown as InputFlow[];

export const Settings = ({ errors, register, parentState, handleChange }) => {
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);

  const renderInputs = (inputs: InputFlow[]): JSX.Element[] => {
    return inputs.map((input) => {
      input.defaultValue = userState[input.name] || "";
      input.value = parentState.createEvent && parentState.createEvent[input.name];
      return <UIInput {...input} handleChange={handleChange} />;
    });
  };

  return <>{renderInputs(inputs)}</>;
};

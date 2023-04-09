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
    name: "image",
    type: "file",
    label: "Background event Image",
    placeholder: "Choose the image for the event",
  },
  {
    name: "group",
    inputs: [
      {
        name: "firstNameB",
        type: "text",
        label: "First name",
        placeholder: "Enter guests amount",
        col: 6,
      },
      {
        name: "lastNameB",
        type: "text",
        label: "Last name",
        placeholder: "Enter guests amount",
        col: 6,
      },
      {
        name: "rollB",
        type: "select",
        label: "Who is",
        options: ["Groom", "Bride"],
        col: 6,
      },
      {
        name: "phoneB",
        type: "tel",
        label: "Phone number",
        placeholder: "Enter phone number",
        col: 6,
      },
    ],
  },
  {
    name: "group",
    inputs: [
      {
        name: "firstName",
        type: "text",
        label: "First name",
        placeholder: "Enter guests amount",
        col: 6,
        disabled: true,
      },
      {
        name: "lastName",
        type: "text",
        label: "Last name",
        placeholder: "Enter guests amount",
        col: 6,

        disabled: true,
      },
      {
        name: "roll",
        type: "select",
        label: "Who is",
        options: ["Groom", "Bride"],
        col: 6,
      },
      {
        name: "phone",
        type: "tel",
        label: "Phone number",
        placeholder: "Enter phone number",
        col: 6,
        disabled: true,
      },
    ],
  },
] as unknown as InputFlow[];

export const Planners = ({ errors, register, parentState, handleChange }) => {
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);

  const renderInputs = (inputs: InputFlow[]): JSX.Element[] => {
    return inputs.map((input) => {
      input.defaultValue = userState[input.name] || "";
      input.value = parentState.createEvent && parentState.createEvent[input.name];
      if (input.name == "group") {
        input.inputs.forEach((inputGroup) => {
          inputGroup.value = parentState && parentState[inputGroup.name];
          inputGroup.defaultValue = userState[inputGroup.name] || "";
        });
        return <UIInput {...input} handleChange={handleChange} />;
      } else {
        return <UIInput {...input} handleChange={handleChange} />;
      }
    });
  };

  return <>{renderInputs(inputs)}</>;
};

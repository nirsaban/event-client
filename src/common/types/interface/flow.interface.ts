import { ChangeEventHandler } from "react";
import { EventTypeEnum, RollEnum } from "../../../pages/flow/components/Planners";
import { State } from "../../../pages/flow/flow";
import { EventType } from "../enum/eventType.enum";

export class ConfirmDetailsProps extends State {
  firstName: string;
  lastName: string;
  phone: string;
}

export class CreateEventProps extends State {
  type: EventType;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
}

export class PlannersProps extends State {
  firstName: string;
  lastName: string;
  phone: string;
  roll: RollEnum;
  image: string;
}

export class SettingsProps extends State {
  guestAmount: number;
  maxBudget: number;
  reserve: number;
  tableSits: number;
  knightsTableSits: number;
}

export class InputFlow {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  defaultValue: any;
  value: any;
  required: boolean;
  inputs?: InputFlow[];
  handleChange: ChangeEventHandler<HTMLInputElement>;
  col?: string;
  disabled?: boolean;
  options?: string[];
  register: (name: string) => any;
  handleChangeDate?: (value: any, name: string) => void;
}

export class InputFlowGroup {
  name: string;
  inputs: InputFlow[];
}

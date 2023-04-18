import { ChangeEventHandler } from 'react';
import { EventTypeEnum } from '../../../pages/flow/components/Planners';
import { State } from '../../../pages/flow/flow';
import { EventType } from '../enum/eventType.enum';
import { RollEnum } from '../enum/roll.enum';

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
  firstNameB: string;
  lastNameB: string;
  phoneB: string;
  rollB: RollEnum;
  image: File;
}

export class SettingsProps extends State {
  guestAmount: string;
  maxBudget: string;
  reserve: string;
  tableSits: string;
  knightsTableSits: string;
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

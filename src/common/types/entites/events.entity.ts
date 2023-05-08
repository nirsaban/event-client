import { EventTypeEnum } from '../enum/eventType.enum';
import { PackagesEnum } from '../enum/packages.enum';
import { SettingsProps } from '../interface/flow.interface';
import { EventsSettingsEntity } from './eventsSettings.entity';
import { GuestEntity } from './guest.entity';
import { GuestsCategoryEntity } from './guestCategories.entity';
import { TablesEntity } from './tables.entity';

export class EventsEntity {
  id: string;
  type: EventTypeEnum;
  date: number;
  time: string;
  package: PackagesEnum;
  locationName: string;
  locationAddress: string;
  eventsSettings: EventsSettingsEntity;
  guestsCategory: GuestsCategoryEntity;
  tables: TablesEntity;
  guests: GuestEntity[];
  settings: SettingsProps;
}

export class Planner {
  firstName: string;
  lastName: string;
  phone: string;
  roll: string;
}

class CreateEvent {
  eventType: string;
  date: number;
  time: string;
  guestsAmount: number;
  maxBudget: number;
  planner: Planner[];
}
export class EventEntity {
  id?: string;
  type: EventTypeEnum;
  date: number;
  time: string;
  locationName: string;
  locationAddress: string;
  planners: Planner[];
  image: File;
}

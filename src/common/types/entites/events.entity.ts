import { PackagesEnum } from "../enum/packages.enum";
import { EventsSettingsEntity } from "./eventsSettings.entity";
import { GuestEntity } from "./guest.entity";
import { GuestsCategoryEntity } from "./guestCategories.entity";
import { TablesEntity } from "./tables.entity";

export class EventsEntity {
  id: string;
  type: string;
  date: number;
  time: string;
  package: PackagesEnum;
  locationName: string;
  locationAddress: string;
  eventsSettings: EventsSettingsEntity;
  guestsCategory: GuestsCategoryEntity;
  tables: TablesEntity;
  guests: GuestEntity[];
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

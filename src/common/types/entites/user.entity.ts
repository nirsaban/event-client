import { EventsEntity } from './events.entity';

export class UserFlow {
  register: boolean;
  confirmDetails: boolean;
  createEvent: boolean;
  onGoing: boolean;
  planners: boolean;
  settings: boolean;
}

export const flowOrder: string[] = ['register', 'confirmDetails', 'createEvent', 'planners', 'settings', 'onGoing'];

export class UsersEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  provider: string;
  flow: UserFlow;
  events: EventsEntity[];
}

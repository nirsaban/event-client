import { EventsEntity } from '../entites/events.entity';
import { UsersEntity } from './../entites/user.entity';

export type InitialState = {
  user?: UsersEntity | null;
  event?: EventsEntity | null;
};

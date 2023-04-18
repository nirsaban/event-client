import { GuestEntity } from './guest.entity';

export enum TableTypeEnum {
  knights = 'knights',
  regular = 'regular',
  reserve = 'reserve'
}

export class TablesEntity {
  id: string;

  number: number;

  type: TableTypeEnum;

  category: string;

  guests: GuestEntity[];

  isFull: boolean;
}

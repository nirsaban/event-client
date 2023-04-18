import { GuestStatusEnum } from '../enum/guestStatus.enum';

export class GuestEntity {
  id: string;
  name: string;
  phoneNumber: string;
  status: GuestStatusEnum;
  amount: number;
  category: string;
}

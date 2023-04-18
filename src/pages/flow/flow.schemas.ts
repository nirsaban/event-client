import { ZodType, z } from 'zod';
import {
  ConfirmDetailsProps,
  CreateEventProps,
  PlannersProps,
  SettingsProps
} from '../../common/types/interface/flow.interface';
import { type } from 'os';
import { EventType } from '../../common/types/enum/eventType.enum';
import { RollEnum } from '../../common/types/enum/roll.enum';
type File = any;

export const schemas = {
  confirmDetails: z.object({
    firstName: z.string().min(2).max(20).nonempty(),
    lastName: z.string().min(2).max(20).nonempty(),
    phone: z
      .string()
      .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'invalid phone number')
      .nonempty()
  }) as ZodType<Partial<ConfirmDetailsProps>>,
  createEvent: z.object({
    locationName: z.string().min(5).nonempty(),
    locationAddress: z.string().min(5).nonempty()
  }) as ZodType<Partial<CreateEventProps>>,
  planners: z.object({
    roll: z.nativeEnum(RollEnum),
    firstNameB: z.string().min(2).max(20).nonempty(),
    lastNameB: z.string().min(2).max(20).nonempty(),
    phoneB: z
      .string()
      .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'invalid phone number')
      .nonempty(),
    rollB: z.nativeEnum(RollEnum),
    image: z.any()
  }) as ZodType<Partial<PlannersProps>>,
  settings: z.object({
    guestAmount: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive()),
    maxBudget: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive()),
    reserve: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive()),
    tableSits: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive()),
    knightsTableSits: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive())
  }) as ZodType<Partial<SettingsProps>>
};

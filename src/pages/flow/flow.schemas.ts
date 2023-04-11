import { ZodType, z } from "zod";
import { ConfirmDetailsProps,CreateEventProps,PlannersProps,SettingsProps } from "../../common/types/interface/flow.interface";
import { type } from "os";
import { EventType } from "../../common/types/enum/eventType.enum";
import {RollEnum} from "./components/Planners"




export const schemas = {
  confirmDetails: z.object({
    // firstName: z.string().min(2).max(20).nonempty(),
    lastName: z.string().min(2).max(20).nonempty(),
    phone: z.string().regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "invalid phone number"),
  }) as ZodType<Partial<ConfirmDetailsProps>>,
  createEvent: z.object({
    locationName: z.string().min(5).nonempty(),
    locationAddress: z.string().min(5).nonempty(),
  }) as ZodType<Partial<CreateEventProps>>,
  planners: z.array({
    firstName: z.string().min(2).max(20).nonempty(),
    lastName: z.string().min(2).max(20).nonempty(),
    phone:  z.string().regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "invalid phone number").nonempty(),
    roll: z.nativeEnum(RollEnum),
    firstNameB: z.string().min(2).max(20).nonempty(),
    lastNameB:z.string().min(2).max(20).nonempty(),
    phoneB: z.string().regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "invalid phone number").nonempty(),
    rollB: z.nativeEnum(RollEnum),
    image: z.string().min(2).max(20).nonempty(),
  }) as ZodType<Partial<PlannersProps>>,
  settings: z.object({
    guestAmount: z.number(),
  maxBudget:  z.number(),
  reserve: z.number(),
  tableSits:  z.number(),
  knightsTableSits: z.number(),
  }) as ZodType<Partial<SettingsProps>>,
};

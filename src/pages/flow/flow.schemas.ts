import { ZodType, z } from "zod";
import { ConfirmDetailsProps } from "../../common/types/interface/flow.interface";
import { type } from "os";
import { EventType } from "../../common/types/enum/eventType.enum";

export const confirmDetailsSchema: ZodType<Partial<ConfirmDetailsProps>> = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(5).max(20).nonempty(),
  phone: z.string().min(5).max(20).nonempty(),
});

export const schemas = {
  confirmDetails: z.object({
    firstName: z.string().min(2).max(20).nonempty(),
    lastName: z.string().min(2).max(20).nonempty(),
    phone: z.string().regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "invalid phone number"),
  }) as ZodType<Partial<ConfirmDetailsProps>>,
  createEvent: z.object({
    // type: z.nativeEnum(EventType),
    // date: z.number(),
    // time: z.nullable(z.string()),
    locationName: z.string().min(5).nonempty(),
    locationAddress: z.string().min(20).nonempty(),
  }) as ZodType<Partial<CreateEventProps>>,
  planners: z.object({
    locationName: z.string().max(50).min(3),
    locationAddress: z.string().max(50).min(3),
  }) as ZodType<Partial<ConfirmDetailsProps>>,
  settings: z.object({
    locationName: z.string().max(50).min(3),
    locationAddress: z.string().max(50).min(3),
  }) as ZodType<Partial<ConfirmDetailsProps>>,
};

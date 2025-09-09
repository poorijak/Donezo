import { status } from "@prisma/client";
import { z } from "zod";

export type TaskInputValue = z.input<typeof taskSchema>;
export type TaskOutputValue = z.output<typeof taskSchema>;

const MIN_NOTE_LENGTH = 1;
const MIN_TITLE_LENGTH = 3;

export const taskSchema = z.object({
  title: z
    .string()
    .min(
      MIN_TITLE_LENGTH,
      `Title must be at least ${MIN_TITLE_LENGTH} characters long`,
    ),
  note: z
    .string()
    .optional()
    .refine(
      (note) => !note || note.length >= MIN_NOTE_LENGTH,
      `Note must be at least ${MIN_NOTE_LENGTH} characters long`,
    ),
  tag: z
    .array(z.string())
    .max(2, "You can select up to 2 tags only")
    .optional(),
  duration: z
    .object({
      start: z.coerce.date(),
      end: z.coerce.date(),
    })
    .partial()
    .optional(),
  status: z.enum(status).optional(),
});

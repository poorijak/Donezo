import { z } from "zod";

const MIN_NOTE_LENGTH = 1;
const MIN_TITLE_LENGTH = 3;

const dayOf = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  return val;
}, z.date().optional());

export const taskSchema = z.object({
  title: z
    .string()
    .min(
      MIN_TITLE_LENGTH,
      `Title must be at least ${MIN_TITLE_LENGTH} characters long`
    ),
  note: z
    .string()
    .optional()
    .refine(
      (note) => !note || note.length >= MIN_NOTE_LENGTH,
      `Note must be at least ${MIN_NOTE_LENGTH} characters long`
    ),
  tag: z.array(z.string()).optional(),
  duration: z
    .object({
      start: dayOf,
      end: dayOf,
    })
    .partial()
    .optional(),
});

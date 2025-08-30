import z from "zod";

const MIN_NOTE_LENGTH = 3;
const MIN_TITLE_LENGTH = 3;

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
      (note) => !note || note.length === MIN_NOTE_LENGTH,
      `Note must be at least ${MIN_NOTE_LENGTH} characters long`
    ),
});

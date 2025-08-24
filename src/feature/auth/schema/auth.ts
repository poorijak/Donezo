import z, { email } from "zod";

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;
const SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>';

const ERROR_MESSAGE = {
  name: `Name must be at least ${MIN_NAME_LENGTH} characters long`,
  email: {
    required: "Email is required",
    invalid: "Invalid email address",
  },

  password: {
    length: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    uppercase: "Password must contain at least 1 uppercase letter",
    lowercase: "Password must contain at least 1 lowercase letter",
    number: "Password must contain at least 1 number",
    special: `Password must contain at least 1 special character from ${SPECIAL_CHARS}`,
  },
  confirmPassword: "Passwords do not match",
};

const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, ERROR_MESSAGE.password.length)
  .regex(/A-Z]/, ERROR_MESSAGE.password.uppercase)
  .regex(/[a-z]/, ERROR_MESSAGE.password.lowercase)
  .regex(/[0-9]/, ERROR_MESSAGE.password.number)
  .regex(new RegExp(`[${SPECIAL_CHARS}]`), ERROR_MESSAGE.password.special);

const emailSchema = z
  .email(ERROR_MESSAGE.email.invalid)
  .min(MIN_NAME_LENGTH, ERROR_MESSAGE.email.required);

export const signupSchema = z.object({
  email: emailSchema,
  name: z.string().min(MIN_NAME_LENGTH, ERROR_MESSAGE.name),
  password: passwordSchema,
});

export const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

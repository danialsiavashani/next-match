import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string()
      .email({ message: "Must be a valid email address" })
      .regex(
        /@(yahoo|gmail|outlook|hotmail|test)\.com$/i, 
        { message: "Email must be a Yahoo, Gmail, Test, or Outlook address" }
      ),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
  });

export type LoginSchema = z.infer<typeof loginSchema>
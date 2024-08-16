import {z} from 'zod'

export const registerSchema = z.object({
    name:z.string().min(3),
    email: z.string()
      .email({ message: "Must be a valid email address" })
      .regex(
        /@(yahoo|gmail|outlook|hotmail)\.com$/i, 
        { message: "Email must be a Yahoo, Gmail, or Outlook address" }
      ),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
  });

export type RegisterSchema = z.infer<typeof registerSchema>
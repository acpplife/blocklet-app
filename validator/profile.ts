import { z } from 'zod';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(20, {
      message: 'Username must be at most 20 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export { profileFormSchema };

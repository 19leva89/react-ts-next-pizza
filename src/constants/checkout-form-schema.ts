import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z.string().trim().min(2, { message: `Ім'я повинне містити не менше 2-х символів` }),
	lastName: z.string().trim().min(2, {
        error: 'Прізвище має містити не менше 2-х символів'
    }),
	email: z.email({
            error: 'Введіть коректну пошту'
        }).trim(),
	phone: z.string().regex(/^[+]?[0-9]{10,12}$/, {
        error: 'Введіть коректний номер телефону'
    }),
	state: z.string().trim().min(5, {
        error: 'Введіть коректну область'
    }),
	city: z.string().trim().min(3, {
        error: 'Введіть коректне місто'
    }),
	address: z.string().trim().min(5, {
        error: 'Введіть коректну адресу'
    }),
	comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

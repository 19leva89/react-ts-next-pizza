import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z.string().trim().min(2, { message: `Ім'я повинне містити не менше 2-х символів` }),
	lastName: z.string().trim().min(2, { message: 'Прізвище має містити не менше 2-х символів' }),
	email: z.string().trim().email({ message: 'Введіть коректну пошту' }),
	phone: z.string().regex(/^[+]?[0-9]{10,12}$/, { message: 'Введіть коректний номер телефону' }),
	region: z.string().trim().min(5, { message: 'Введіть коректну область' }),
	city: z.string().trim().min(5, { message: 'Введіть коректне місто' }),
	address: z.string().trim().min(5, { message: 'Введіть коректну адресу' }),
	comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

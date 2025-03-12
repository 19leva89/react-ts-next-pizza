import { z } from 'zod'

const errMsg = {
	email: 'Введіть коректну пошту',
	fullName: `Введіть ім'я та прізвище`,
	confirmPassword: 'Паролі не збігаються',
}

// Scheme for password
const passwordSchema = z
	.string()
	.min(8, { message: 'Пароль повинен бути не менше 8 символів' })
	.regex(/[A-Z]/, { message: 'Пароль повинен містити хоча б одну велику літеру' })
	.regex(/[a-z]/, { message: 'Пароль повинен містити хоча б одну маленьку літеру' })
	.regex(/\d/, { message: 'Пароль повинен містити хоча б одну цифру' })

// Scheme for login
export const formLoginSchema = z.object({
	email: z.string().email({ message: errMsg.email }),
	password: passwordSchema,
})

// Scheme for registration
export const formRegisterSchema = formLoginSchema
	.extend({
		fullName: z.string().min(2, { message: errMsg.fullName }),
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: errMsg.confirmPassword,
		path: ['confirmPassword'],
	})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>

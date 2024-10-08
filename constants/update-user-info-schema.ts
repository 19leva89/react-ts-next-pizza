import { z } from 'zod'

const errMsg = {
	email: 'Введіть коректну пошту',
	fullName: `Введіть повне ім'я`,
	confirmPassword: 'Паролі не збігаються',
}

export const updateUserInfoSchema = z
	.object({
		email: z.string().trim().email({ message: errMsg.email }),
		fullName: z.string().trim().min(2, { message: errMsg.fullName }).optional(),
		password: z
			.string()
			.optional()
			.refine(
				(val) => {
					if (!val) return true // If the password is not specified, validation passes
					return val.length >= 8 // Check the password length
				},
				{ message: 'Пароль повинен бути не менше 8 символів' },
			)
			.refine(
				(val) => {
					if (!val) return true // If the password is not specified, validation passes
					return /[A-Z]/.test(val) // Check for at least one capital letter
				},
				{ message: 'Пароль повинен містити хоча б одну велику літеру' },
			)
			.refine(
				(val) => {
					if (!val) return true // If the password is not specified, validation passes
					return /[a-z]/.test(val) // Check for at least one lowercase letter
				},
				{ message: 'Пароль повинен містити хоча б одну маленьку літеру' },
			)
			.refine(
				(val) => {
					if (!val) return true // If the password is not specified, validation passes
					return /\d/.test(val) // Check for the presence of at least one digit
				},
				{ message: 'Пароль повинен містити хоча б одну цифру' },
			),
		confirmPassword: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.password && data.password !== data.confirmPassword) {
				return false
			}
			return true
		},
		{
			message: errMsg.confirmPassword,
			path: ['confirmPassword'],
		},
	)

export type UserFormValues = z.infer<typeof updateUserInfoSchema>

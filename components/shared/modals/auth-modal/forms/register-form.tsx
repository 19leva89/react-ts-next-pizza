import { FC } from 'react'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui'
import { registerUser } from '@/app/actions'
import { FormInput } from '@/components/shared'
import { TFormRegisterValues, formRegisterSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
}

export const RegisterForm: FC<Props> = ({ onClose }) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				fullName: data.fullName,
				email: data.email,
				password: data.password,
			})

			toast.success('Реєстрація успішна 📝. Підтвердьте свою пошту')

			onClose?.()
		} catch (error) {
			return toast.error('Неправильний Email або пароль')
		}
	}

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5 min-h-[450px]" onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Реєстрація аккаунта</CardTitle>

						<CardDescription>Введіть свої дані, щоб зареєструвати акаунт</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-5">
						<FormInput name="email" type="email" placeholder="Email" required />

						<FormInput name="fullName" type="text" placeholder="Повне ім'я" required />

						<FormInput name="password" type="password" placeholder="Пароль" required />

						<FormInput name="confirmPassword" type="password" placeholder="Повторіть пароль" required />
					</CardContent>

					<CardFooter>
						<Button loading={form.formState.isSubmitting} className="h-12 text-base w-full" type="submit">
							Зареєструватись
						</Button>
					</CardFooter>
				</Card>
			</form>
		</FormProvider>
	)
}

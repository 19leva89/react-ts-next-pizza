'use client'

import { FC } from 'react'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui'
import { registerUser } from '@/app/actions'
import { FormInput } from '@/components/shared'
import { TFormRegisterValues, formRegisterSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
	onClickLogin?: VoidFunction
}

export const RegisterForm: FC<Props> = ({ onClose, onClickLogin }) => {
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
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput name="email" label="Email" required />

				<FormInput name="fullName" label="Повне ім'я" required />

				<FormInput name="password" label="Пароль" type="password" required />

				<FormInput name="confirmPassword" label="Підтвердьте пароль" type="password" required />

				<Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
					Зареєструватись
				</Button>
			</form>
		</FormProvider>
	)
}

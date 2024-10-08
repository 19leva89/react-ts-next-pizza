'use client'

import { FC } from 'react'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { User } from '@prisma/client'
import { Button } from '@/components/ui'
import { updateUserInfo } from '@/app/actions'
import { Container, FormInput, Title } from '@/components/shared'
import { TFormRegisterValues, formRegisterSchema } from '@/components/shared/modals/auth-modal/forms/schemas'

interface Props {
	data: User
}

export const ProfileForm: FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.success('Дані оновлені 📝')
		} catch (error) {
			return toast.error('Помилка під час оновлення даних')
		}
	}

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/',
		})
	}

	return (
		<Container className="my-10">
			<Title text="Особисті дані" size="md" className="font-bold" />

			<FormProvider {...form}>
				<form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name="email" label="Email" type="email" required />

					<FormInput name="fullName" label="Повне ім'я" type="text" required />

					<FormInput name="password" label="Новий пароль" type="password" required />

					<FormInput name="confirmPassword" label="Повторіть пароль" type="password" required />

					<Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
						Зберегти
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base"
						type="button"
					>
						Вийти
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}

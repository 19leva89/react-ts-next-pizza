'use client'

import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { User } from '@prisma/client'
import { Button } from '@/components/ui'
import { updateUserInfo } from '@/app/actions'
import { Container, FormInput, Title } from '@/components/shared'
import { updateUserInfoSchema, UserFormValues } from '@/constants/update-user-info-schema'

interface Props {
	data: User
}

export const ProfileForm = ({ data }: Props) => {
	const form = useForm({
		resolver: zodResolver(updateUserInfoSchema),
		defaultValues: {
			email: data.email,
			fullName: data.fullName || '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (formData: UserFormValues) => {
		try {
			const updateData = {
				email: formData.email,
				fullName: formData.fullName,
				...(formData.password ? { password: formData.password } : {}),
			}

			await updateUserInfo(updateData)

			toast.success('Дані оновлені 📝')
		} catch (error) {
			console.error('Error updating user info:', error)

			if (error instanceof Error) {
				toast.error(error.message)
			} else {
				toast.error('Помилка під час оновлення даних')
			}
		}
	}

	return (
		<Container>
			<Title text="Персональна інформація" size="md" className="font-bold" />

			<FormProvider {...form}>
				<form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name="email" label="Email" type="email" required />

					<FormInput name="fullName" label="Повне ім'я" type="text" required />

					<FormInput name="password" label="Новий пароль" type="password" />

					<FormInput name="confirmPassword" label="Повторіть пароль" type="password" />

					<Button
						disabled={form.formState.isSubmitting}
						className="h-12 text-base mt-10 transition-colors ease-in-out duration-300"
						type="submit"
					>
						Зберегти
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}

import { FC } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui'
import { FormInput, Title } from '@/components/shared'
import { TFormLoginValues, formLoginSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm: FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success('Ви успішно увійшли в акаунт')

			onClose?.()
		} catch (error) {
			console.error('Error [LOGIN]', error)
			toast.error('Неможливо увійти в аккаунт')
		}
	}

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вхід в аккаунт" size="md" className="font-bold" />

						<p className="text-gray-400">Введіть свою пошту, щоб увійти до свого акаунту</p>
					</div>

					<Image src="/assets/img/phone-icon.png" alt="phone icon" width={60} height={60} />
				</div>

				<FormInput name="email" label="Email" type="email" required />

				<FormInput name="password" label="Пароль" type="password" required />

				<Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
					Увійти
				</Button>
			</form>
		</FormProvider>
	)
}

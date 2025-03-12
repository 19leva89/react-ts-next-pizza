import Image from 'next/image'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
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
import { FormInput } from '@/components/shared'
import { TFormLoginValues, formLoginSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm = ({ onClose }: Props) => {
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
			<form className="flex flex-col gap-5 h-full min-h-[450px]" onSubmit={form.handleSubmit(onSubmit)}>
				<Card className="flex flex-col justify-between items-stretch flex-grow">
					<div>
						<CardHeader>
							<CardTitle>Вхід в аккаунт</CardTitle>

							<CardDescription>Введіть свою пошту, щоб увійти до свого акаунту</CardDescription>
						</CardHeader>

						<CardContent className="flex flex-col gap-5">
							<FormInput name="email" type="email" placeholder="Email" required />

							<FormInput name="password" type="password" placeholder="Пароль" required />
						</CardContent>
					</div>

					<CardFooter className="flex flex-col gap-4">
						<Button
							loading={form.formState.isSubmitting}
							className="h-12 text-base w-full transition-colors ease-in-out duration-300"
							type="submit"
						>
							Увійти
						</Button>

						<div className="flex gap-2 w-full">
							<Button
								variant="outline"
								onClick={() =>
									signIn('github', {
										callbackUrl: '/',
										redirect: true,
									})
								}
								type="button"
								className="gap-2 h-12 p-2 flex-1 transition-colors ease-in-out duration-300"
							>
								<Image width={24} height={24} alt="GitHub" src="/assets/img/github-icon.svg" />
								GitHub
							</Button>

							<Button
								variant="outline"
								onClick={() =>
									signIn('google', {
										callbackUrl: '/',
										redirect: true,
									})
								}
								type="button"
								className="gap-2 h-12 p-2 flex-1 transition-colors ease-in-out duration-300"
							>
								<Image width={24} height={24} alt="Google" src="/assets/img/google-icon.svg" />
								Google
							</Button>
						</div>
					</CardFooter>
				</Card>
			</form>
		</FormProvider>
	)
}

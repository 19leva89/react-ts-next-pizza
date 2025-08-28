import Image from 'next/image'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
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
	Separator,
} from '@/components/ui'
import { FormInput } from '@/components/shared'
import { loginUser, loginUserWithCreds } from '@/app/actions'
import { TFormLoginValues, formLoginSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm = ({ onClose }: Props) => {
	const { update } = useSession()

	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			await loginUserWithCreds({
				email: data.email,
				password: data.password,
			})

			toast.success('Ви успішно увійшли в акаунт')

			onClose?.()

			await update()
		} catch (error) {
			console.error('Error [LOGIN]', error)

			toast.error(error instanceof Error ? error.message : 'Неможливо увійти в аккаунт')
		}
	}

	const handleLogin = async (provider: string) => {
		await loginUser(provider)

		await update()
	}

	return (
		<FormProvider {...form}>
			<form className='flex h-full min-h-[450px] flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
				<Card className='flex flex-grow flex-col items-stretch justify-between'>
					<div>
						<CardHeader>
							<CardTitle>Вхід в аккаунт</CardTitle>

							<CardDescription>Введіть свою пошту, щоб увійти до свого акаунту</CardDescription>
						</CardHeader>

						<CardContent className='flex flex-col gap-5'>
							<FormInput name='email' type='email' placeholder='Email' required />

							<FormInput name='password' type='password' placeholder='Пароль' required />
						</CardContent>
					</div>

					<CardFooter className='flex flex-col gap-4'>
						<Button
							loading={form.formState.isSubmitting}
							className='h-12 w-full text-base transition-colors duration-300 ease-in-out'
							type='submit'
						>
							Увійти
						</Button>

						<Separator className='relative my-4'>
							<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/100 px-2 text-sm text-muted-foreground'>
								або продовжити з
							</span>
						</Separator>

						<div className='flex w-full gap-2'>
							<Button
								variant='outline'
								onClick={() => handleLogin('github')}
								type='button'
								className='h-12 flex-1 gap-2 p-2 transition-colors duration-300 ease-in-out'
							>
								<Image width={24} height={24} alt='GitHub' src='/assets/svg/github-icon.svg' />
								GitHub
							</Button>

							<Button
								variant='outline'
								onClick={() => handleLogin('google')}
								type='button'
								className='h-12 flex-1 gap-2 p-2 transition-colors duration-300 ease-in-out'
							>
								<Image width={24} height={24} alt='Google' src='/assets/svg/google-icon.svg' />
								Google
							</Button>
						</div>
					</CardFooter>
				</Card>
			</form>
		</FormProvider>
	)
}

import { toast } from 'sonner'
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

export const RegisterForm = ({ onClose }: Props) => {
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
				name: data.fullName,
				email: data.email,
				password: data.password,
			})

			toast.success('Реєстрація успішна 📝. Підтвердьте свою пошту')

			onClose?.()
		} catch {
			return toast.error('Неправильний Email або пароль')
		}
	}

	return (
		<FormProvider {...form}>
			<form className='flex h-full min-h-[450px] flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
				<Card className='flex flex-grow flex-col items-stretch justify-between'>
					<div>
						<CardHeader>
							<CardTitle>Реєстрація аккаунта</CardTitle>

							<CardDescription>Введіть свої дані, щоб зареєструвати акаунт</CardDescription>
						</CardHeader>

						<CardContent className='flex flex-col gap-5'>
							<FormInput name='email' type='email' placeholder='Email' required />

							<FormInput name='fullName' type='text' placeholder="Повне ім'я" required />

							<FormInput name='password' type='password' placeholder='Пароль' required />

							<FormInput name='confirmPassword' type='password' placeholder='Повторіть пароль' required />
						</CardContent>
					</div>

					<CardFooter className='flex flex-col gap-4'>
						<Button
							loading={form.formState.isSubmitting}
							className='h-12 w-full text-base transition-colors duration-300 ease-in-out'
							type='submit'
						>
							Зареєструватись
						</Button>
					</CardFooter>
				</Card>
			</form>
		</FormProvider>
	)
}

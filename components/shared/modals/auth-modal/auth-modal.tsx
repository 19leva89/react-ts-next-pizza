'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { signIn } from 'next-auth/react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogTitle,
	Input,
	Label,
	Separator,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui'
import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: FC<Props> = ({ open, onClose }) => {
	const [type, setType] = useState<'login' | 'register'>('login')

	const handleClose = () => {
		onClose()
	}

	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login')
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="w-[450px] bg-white p-10" aria-describedby={undefined}>
				<DialogTitle>
					{type === 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />}
				</DialogTitle>

				<hr />

				<Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
					{type !== 'login' ? 'Увійти' : 'Реєстрація'}
				</Button>

				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Вхід</TabsTrigger>

						<TabsTrigger value="register">Реєстрація</TabsTrigger>
					</TabsList>

					<TabsContent value="login">
						<Card>
							<CardHeader>
								<CardTitle>Вхід в аккаунт</CardTitle>

								<CardDescription>Введіть свою пошту, щоб увійти до свого акаунту</CardDescription>
							</CardHeader>

							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="name">Name</Label>

									<Input id="name" defaultValue="Pedro Duarte" />
								</div>

								<div className="space-y-1">
									<Label htmlFor="username">Username</Label>

									<Input id="username" defaultValue="@peduarte" />
								</div>
							</CardContent>

							<CardFooter>
								<Button type="button" className="h-12">
									Увійти
								</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<TabsContent value="register">
						<Card>
							<CardHeader>
								<CardTitle>Реєстрація аккаунта</CardTitle>

								<CardDescription>Введіть свої дані, щоб зареєструвати акаунт</CardDescription>
							</CardHeader>

							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="current">Current password</Label>

									<Input id="current" type="password" />
								</div>

								<div className="space-y-1">
									<Label htmlFor="new">New password</Label>

									<Input id="new" type="password" />
								</div>
							</CardContent>

							<CardFooter>
								<Button type="button" className="h-12">
									Зареєструватись
								</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<Separator />

					<div className="flex gap-2">
						<Button
							variant="secondary"
							onClick={() =>
								signIn('github', {
									callbackUrl: '/',
									redirect: true,
								})
							}
							type="button"
							className="gap-2 h-12 p-2 flex-1"
						>
							<Image width={24} height={24} alt="GitHub" src="/assets/img/github-icon.svg" />
							GitHub
						</Button>

						<Button
							variant="secondary"
							onClick={() =>
								signIn('google', {
									callbackUrl: '/',
									redirect: true,
								})
							}
							type="button"
							className="gap-2 h-12 p-2 flex-1"
						>
							<Image width={24} height={24} alt="Google" src="/assets/img/google-icon.svg" />
							Google
						</Button>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}

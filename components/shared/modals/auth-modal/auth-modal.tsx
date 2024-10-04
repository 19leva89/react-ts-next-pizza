'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { signIn } from 'next-auth/react'

import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'
import { Button, Dialog, DialogContent } from '@/components/ui'

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
			<DialogContent className="w-[450px] bg-white p-10">
				{type === 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />}

				<hr />

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

				<Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
					{type !== 'login' ? 'Увійти' : 'Реєстрація'}
				</Button>
			</DialogContent>
		</Dialog>
	)
}

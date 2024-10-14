'use client'

import { FC } from 'react'

import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'
import { Dialog, DialogContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: FC<Props> = ({ open, onClose }) => {
	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="w-[480px] bg-white p-10" aria-describedby={undefined}>
				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2 bg-[#ffe4d5]">
						<TabsTrigger
							value="login"
							className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary"
						>
							Вхід
						</TabsTrigger>

						<TabsTrigger
							value="register"
							className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary"
						>
							Реєстрація
						</TabsTrigger>
					</TabsList>

					<TabsContent value="login">
						<LoginForm onClose={handleClose} />
					</TabsContent>

					<TabsContent value="register">
						<RegisterForm onClose={handleClose} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}

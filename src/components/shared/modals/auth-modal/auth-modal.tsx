'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
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

export const AuthModal = ({ open, onClose }: Props) => {
	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="w-120 p-10 bg-white" aria-describedby={undefined}>
				<DialogTitle className="hidden" />

				<DialogDescription className="hidden" />

				<Tabs defaultValue="account" className="w-100">
					<TabsList className="grid grid-cols-2 w-full bg-[#ffe4d5]">
						<TabsTrigger
							value="login"
							className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary"
						>
							Вхід
						</TabsTrigger>

						<TabsTrigger
							value="register"
							className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary"
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

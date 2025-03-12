import { FormInput, WhiteBlock } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutPersonalForm = ({ className }: Props) => {
	return (
		<WhiteBlock title="2. Персональні дані" className={className}>
			<div className="grid grid-cols-2 gap-5">
				<FormInput name="firstName" type="text" className="text-base" placeholder="Ім'я" />

				<FormInput name="lastName" type="text" className="text-base" placeholder="Прізвище" />

				<FormInput name="email" type="email" className="text-base" placeholder="Email" />

				<FormInput name="phone" type="tel" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	)
}

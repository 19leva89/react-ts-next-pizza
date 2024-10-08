import { FC } from 'react'

import { FormInput, FormTextarea, WhiteBlock } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="3. Адреса доставки" className={className}>
			<div className="flex flex-col gap-5">
				<div className="grid grid-cols-2 gap-5">
					<FormInput name="region" type="text" className="text-base" placeholder="Область" />

					<FormInput name="city" type="text" className="text-base" placeholder="Місто" />
				</div>

				<FormInput name="address" type="text" className="text-base" placeholder="Адреса" />

				<FormTextarea name="comment" className="text-base" placeholder="Коментар до замовлення" rows={5} />
			</div>
		</WhiteBlock>
	)
}

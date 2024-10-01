'use client'

import { FC } from 'react'
// import { Controller, useFormContext } from 'react-hook-form'

import { ErrorText, FormTextarea, WhiteBlock } from '@/components/shared'

import { AdressInput } from '../address-input'

interface Props {
	className?: string
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
	// const { control } = useFormContext()

	return (
		<WhiteBlock title="3. Адреса доставки" className={className}>
			<div className="flex flex-col gap-5">
				{/* <Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AdressInput onChange={field.onChange} />
							{fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
						</>
					)}
				/> */}

				<FormTextarea name="comment" className="text-base" placeholder="Коментар до замовлення" rows={5} />
			</div>
		</WhiteBlock>
	)
}

import { FC, useState } from 'react'

import { STATES } from '@/constants/delivery'
import { FormCombobox } from '@/components/shared/form'
import { FormInput, FormTextarea, WhiteBlock } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
	const [selectedState, setSelectedState] = useState<string>('')

	const filteredCities = CITIES.filter((city) => {
		if (selectedState === 'Запорізька') {
			return city.value === 'Запоріжжя' || city.value === 'Бердянськ'
		}
		if (selectedState === 'Київська') {
			return city.value === 'Київ' || city.value === 'Боярка'
		}
		return false
	})

	return (
		<WhiteBlock title="3. Адреса доставки" className={className}>
			<div className="flex flex-col gap-5">
				<div className="grid grid-cols-2 gap-5">
					<FormCombobox
						name="state"
						placeholder="Область"
						noResultsText="Область не знайдена"
						selectPlaceholder="Знайти область..."
						mapTable={STATES}
						className="w-full justify-between h-12 text-md"
						onSelect={(state) => setSelectedState(state)}
					/>

					<FormCombobox
						name="city"
						placeholder="Місто"
						noResultsText="Місто не знайдене"
						selectPlaceholder="Знайти місто..."
						mapTable={filteredCities}
						className="w-full justify-between h-12 text-md"
					/>
				</div>

				<FormInput name="address" type="text" className="text-base" placeholder="Адреса" />

				<FormTextarea name="comment" className="text-base" placeholder="Коментар до замовлення" rows={5} />
			</div>
		</WhiteBlock>
	)
}

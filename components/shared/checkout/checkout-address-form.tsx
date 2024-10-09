'use client'

import { FC, useEffect, useState } from 'react'

import { Api } from '@/services/api-client'
import { FormCombobox } from '@/components/shared/form'
import { CityDTO, StateDTO } from '@/services/dto/delivery.dto'
import { FormInput, FormTextarea, WhiteBlock } from '@/components/shared'

interface Props {
	className?: string
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
	const [states, setStates] = useState<StateDTO[]>([])
	const [selectedState, setSelectedState] = useState<number | null>(null)
	const [filteredCities, setFilteredCities] = useState<CityDTO[]>([])

	useEffect(() => {
		async function fetchStates() {
			const data = await Api.delivery.getStates()

			setStates(data)
		}

		fetchStates()
	}, [])

	useEffect(() => {
		async function fetchCities() {
			if (selectedState) {
				const data = await Api.delivery.getCitiesByStateId(selectedState) // Используйте новую функцию

				setFilteredCities(data) // Установите отфильтрованные города
			}
		}

		fetchCities()
	}, [selectedState])

	return (
		<WhiteBlock title="3. Адреса доставки" className={className}>
			<div className="flex flex-col gap-5">
				<div className="grid grid-cols-2 gap-5">
					<FormCombobox
						name="state"
						placeholder="Область"
						noResultsText="Область не знайдена"
						selectPlaceholder="Знайти область..."
						mapTable={states}
						className="w-full justify-between h-12 text-md"
						onSelect={(state) => {
							setSelectedState(state.id)
							setFilteredCities([])
						}}
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

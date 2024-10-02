import { ChangeEvent, FC, useState } from 'react'
import { Libraries, useLoadScript } from '@react-google-maps/api'

interface Props {
	onChange?: (value?: string) => void
}

const libraries: Libraries = ['places']

export const AdressInput: FC<Props> = ({ onChange }) => {
	const [inputValue, setInputValue] = useState('')
	const [suggestions, setSuggestions] = useState<string[]>([])

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
		libraries,
	})

	const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setInputValue(value)

		if (value.length > 2 && isLoaded) {
			const autocompleteService = new google.maps.places.AutocompleteService()
			autocompleteService.getPlacePredictions(
				{ input: value, componentRestrictions: { country: 'ua' } }, // Пошук обмежений Україною

				(predictions, status) => {
					if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
						setSuggestions(predictions.map((prediction) => prediction.description))
					}
				},
			)
		}
	}

	const handleSelect = (suggestion: string) => {
		setInputValue(suggestion)
		setSuggestions([])
		onChange?.(suggestion)
	}

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Введіть адресу"
				className="border rounded px-4 py-2 w-full"
			/>
			{suggestions.length > 0 && (
				<ul className="border border-gray-300 mt-2 rounded shadow-lg">
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => handleSelect(suggestion)}
							className="px-4 py-2 cursor-pointer hover:bg-gray-200"
						>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

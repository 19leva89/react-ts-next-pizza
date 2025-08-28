import { useEffect, useState } from 'react'
import { Ingredient } from '@prisma/client'

import { Api } from '@/services/api-client'

export const useIngredients = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [ingredients, setIngredients] = useState<Ingredient[]>([])

	useEffect(() => {
		async function getIngredients() {
			try {
				setLoading(true)

				const value = await Api.ingredients.getAll()

				setIngredients(value)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getIngredients()
	}, [])

	return { ingredients, loading }
}

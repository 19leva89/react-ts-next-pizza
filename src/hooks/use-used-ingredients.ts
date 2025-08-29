import { useEffect, useState } from 'react'
import { Ingredient } from '@prisma/client'

import { Api } from '@/services/api-client'

export const useUsedIngredients = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [usedIngredients, setUsedIngredients] = useState<Ingredient[]>([])

	useEffect(() => {
		async function getIngredients() {
			try {
				setLoading(true)

				const value = await Api.ingredients.getUsedInProducts()

				setUsedIngredients(value)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getIngredients()
	}, [])

	return { usedIngredients, loading }
}

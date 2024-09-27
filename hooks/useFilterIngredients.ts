import { useSet } from 'react-use'
import { useEffect, useState } from 'react'
import { Ingredient } from '@prisma/client'

import { Api } from '@/services/api-client'

interface ReturnProps {
	ingredients: Ingredient[]
	loading: boolean
	selectedIds: Set<string>
	onAddId: (id: string) => void
}

export const useFilterIngredients = (): ReturnProps => {
	const [loading, setLoading] = useState(true)
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [selectedIds, { toggle }] = useSet<string>(new Set([]))

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

	return { ingredients, loading, onAddId: toggle, selectedIds }
}

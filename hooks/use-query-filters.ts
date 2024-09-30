import QueryString from 'qs'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { Filters } from '@/hooks/use-filters'

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter()
	const isMounted = useRef(false)

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				...filters.prices,
				pizzaSizes: Array.from(filters.pizzaSizes),
				pizzaTypes: Array.from(filters.pizzaTypes),
				ingredients: Array.from(filters.ingredients),
			}

			const query = QueryString.stringify(params, {
				arrayFormat: 'comma',
			})

			router.push(`?${query}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [filters, router])
}

import qs from 'query-string'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { Filters } from '@/hooks/use-filters'

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter()
	const isMounted = useRef(false)

	console.log('filters', filters)

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				priceFrom: filters.prices.priceFrom,
				priceTo: filters.prices.priceTo,
				pizzaSizes: Array.from(filters.pizzaSizes),
				pizzaTypes: Array.from(filters.pizzaTypes),
				ingredients: Array.from(filters.ingredients),
				sort: filters.sort,
			}

			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			})

			console.log('query', query)

			router.push(`?${query}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [filters])
}

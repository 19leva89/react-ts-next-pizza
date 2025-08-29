import { Ingredient } from '@prisma/client'

import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

	return data
}

export const getUsedInProducts = async () => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS_USED)

	return data
}

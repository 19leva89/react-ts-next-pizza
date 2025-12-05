import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'
import { Ingredient } from '@/generated/prisma/client'

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

	return data
}

export const getUsedInProducts = async () => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS_USED)

	return data
}

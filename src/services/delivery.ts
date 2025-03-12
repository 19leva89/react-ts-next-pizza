import { axiosInstance } from './instance'
import { CityDTO, StateDTO } from './dto/delivery.dto'

export const getStates = async (): Promise<StateDTO[]> => {
	const { data } = await axiosInstance.get<StateDTO[]>('/states')

	return data
}

export const getCitiesByStateId = async (stateId: number): Promise<CityDTO[]> => {
	const { data } = await axiosInstance.get<CityDTO[]>(`/cities?stateId=${stateId}`)

	return data
}

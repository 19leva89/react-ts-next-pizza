import { City, Community, District, State } from '@prisma/client'

export type StateDTO = State & {
	id: number
	name: string
}

export type DistrictDTO = District & {
	stateId: number
}

export type CommunityDTO = Community & {
	districtId: number
}

export type CityDTO = City & {
	communityId: number
}

import { City, Community, District, State } from '@prisma/client'

export type StateDTO = State & {
	id: string
	name: string
}

export type DistrictDTO = District & {
	stateId: string
}

export type CommunityDTO = Community & {
	districtId: string
}

export type CityDTO = City & {
	communityId: string
}

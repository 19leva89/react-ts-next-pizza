import { createWithEqualityFn as create } from 'zustand/traditional'

interface State {
	activeId: number
	setActiveId: (activeId: number) => void
}

export const useCategoryStore = create<State>((set) => ({
	activeId: 1,
	setActiveId: (activeId: number) => set({ activeId }),
}))

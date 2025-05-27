import { ReactNode } from 'react'

import { Checkbox } from '@/components/ui'

export interface FilterCheckboxProps {
	value: string
	text: string
	name?: string
	endAdornment?: ReactNode
	onCheckedChange?: (checked: boolean) => void
	checked?: boolean
}

export const CheckboxFilter = ({
	value,
	text,
	name,
	endAdornment,
	onCheckedChange,
	checked,
}: FilterCheckboxProps) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={`checkbox-${String(name)}-${String(value)}`}
				value={value}
				checked={checked}
				onCheckedChange={onCheckedChange}
				className="rounded-[8px] size-6 cursor-pointer"
			/>
			<label
				htmlFor={`checkbox-${String(name)}-${String(value)}`}
				className="leading-none cursor-pointer flex-1"
			>
				{text}
			</label>
			{endAdornment}
		</div>
	)
}

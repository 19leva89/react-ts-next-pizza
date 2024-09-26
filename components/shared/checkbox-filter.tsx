import { FC } from 'react'

import { Checkbox } from '@/components/ui'

export interface FilterChecboxProps {
	text: string
	value: string
	endAdornment?: React.ReactNode
	onCheckedChange?: (checked: boolean) => void
	checked?: boolean
}

export const CheckboxFilter: FC<FilterChecboxProps> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={`checkbox-${String(value)}`}
				value={value}
				checked={checked}
				onCheckedChange={onCheckedChange}
				className="rounded-[8px] w-6 h-6"
			/>
			<label htmlFor={`checkbox-${String(value)}`} className="leading-none cursor-pointer flex-1">
				{text}
			</label>
			{endAdornment}
		</div>
	)
}

'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui'
import { cn } from '@/lib'
import { useFormContext } from 'react-hook-form'
import { ErrorText } from '@/components/shared'

interface Item {
	value: string
	label?: string
}

interface Props {
	name: string
	placeholder: string
	noResultsText: string
	selectPlaceholder: string
	mapTable: Item[]
	className?: string
}

export function FormCombobox({
	name,
	placeholder,
	noResultsText,
	selectPlaceholder,
	mapTable,
	className,
}: Props) {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()
	const [open, setOpen] = useState(false)

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const handleSelect = (currentValue: string) => {
		setValue(name, currentValue, { shouldValidate: true })
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						onClick={() => setOpen(true)}
						className={cn('border-[##e5e7eb] text-[#78716c] hover:bg-transparent', className)}
						{...register(name)}
					>
						{value
							? mapTable.find((item) => item.value.toLowerCase() === value.toLowerCase())?.label || value
							: placeholder}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>

				{errorText && <ErrorText text={errorText} className="mt-2" />}
			</div>

			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={selectPlaceholder} name={name} />

					<CommandList>
						<CommandEmpty>{noResultsText}</CommandEmpty>

						<CommandGroup>
							{mapTable.map((item) => (
								<CommandItem key={item.value} value={item.value} onSelect={handleSelect}>
									<Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
									{item.label || item.value}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

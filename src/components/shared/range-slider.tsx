'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef, Fragment, RefObject, useEffect, useState } from 'react'

import { cn } from '@/lib'

type Props = {
	min: number
	max: number
	step: number
	value?: number[] | readonly number[]
	formatLabel?: (value: number) => string
	onValueChange?: (values: number[]) => void
	className?: string
}

export const RangeSlider = forwardRef(
	({ min, max, step, value, formatLabel, onValueChange, className, ...props }: Props, ref) => {
		const initialValue = Array.isArray(value) && value.length > 0 ? Array.from(value) : [min, max]

		const [values, setValues] = useState<number[]>(initialValue)

		useEffect(() => {
			// Update localValues when the external value prop changes (guard empty and shallow-compare)
			const next = Array.isArray(value) && value.length > 0 ? Array.from(value) : [min, max]

			setValues((prev) => (prev.length === next.length && prev.every((n, i) => n === next[i]) ? prev : next))
		}, [min, max, value])

		const handleValueChange = (newValues: number[]) => {
			setValues(newValues)

			if (onValueChange) {
				onValueChange(newValues)
			}
		}

		return (
			<SliderPrimitive.Root
				ref={ref as RefObject<HTMLDivElement>}
				min={min}
				max={max}
				step={step}
				value={values}
				onValueChange={handleValueChange}
				className={cn(
					'relative mb-6 flex w-full cursor-pointer touch-none items-center select-none',
					className,
				)}
				{...props}
			>
				<SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20'>
					<SliderPrimitive.Range className='absolute h-full bg-primary' />
				</SliderPrimitive.Track>

				{values.map((value, index) => (
					<Fragment key={index}>
						<div
							className='absolute text-center'
							style={{
								left:
									value === min
										? '1.3%'
										: value === max
											? 'calc(100% - 25px)'
											: `calc(${((value - min) / (max - min)) * 100}% - 8px)`,
								top: '10px',
								position: 'absolute',
							}}
						>
							<span className='text-sm'>{formatLabel ? formatLabel(value) : value}</span>
						</div>

						<SliderPrimitive.Thumb className='block size-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50' />
					</Fragment>
				))}
			</SliderPrimitive.Root>
		)
	},
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef, Fragment, RefObject, useEffect, useState } from 'react'

import { cn } from '@/lib'

type Props = {
	className?: string
	min: number
	max: number
	step: number
	formatLabel?: (value: number) => string
	value?: number[] | readonly number[]
	onValueChange?: (values: number[]) => void
}

export const RangeSlider = forwardRef(
	({ className, min, max, step, formatLabel, value, onValueChange, ...props }: Props, ref) => {
		const initialValue = Array.isArray(value) ? value : [min, max]
		const [values, setValues] = useState(initialValue)

		useEffect(() => {
			// Update localValues when the external value prop changes
			setValues(Array.isArray(value) ? value : [min, max])
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
					'relative flex w-full touch-none select-none mb-6 items-center cursor-pointer',
					className,
				)}
				{...props}
			>
				<SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
					<SliderPrimitive.Range className="absolute h-full bg-primary" />
				</SliderPrimitive.Track>

				{values.map((value, index) => (
					<Fragment key={index}>
						<div
							className="absolute text-center"
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
							<span className="text-sm">{formatLabel ? formatLabel(value) : value}</span>
						</div>

						<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
					</Fragment>
				))}
			</SliderPrimitive.Root>
		)
	},
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

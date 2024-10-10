'use client'

import { useFormContext } from 'react-hook-form'
import { FC, TextareaHTMLAttributes } from 'react'

import { Textarea } from '@/components/ui'
import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormTextarea: FC<Props> = ({ className, name, label, required, ...props }) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const onClickClear = () => {
		setValue(name, '')
	}

	return (
		<div className={className}>
			<p className="font-medium mb-2">
				{label} {required && <RequiredSymbol />}
			</p>

			<div className="relative">
				<Textarea className="h-12 text-md" {...register(name)} {...props} />

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className="mt-2 ml-4" />}
		</div>
	)
}

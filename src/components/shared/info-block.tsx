import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib'
import { Title } from './title'
import { Button } from '../ui/button'

interface Props {
	title: string
	text: string
	imageUrl: string
	className?: string
}

export const InfoBlock = ({ title, text, imageUrl, className }: Props) => {
	return (
		<div className={cn(className, 'm-4 flex flex-wrap items-center justify-center gap-12')}>
			<div className='flex flex-col'>
				<div className='w-full'>
					<Title size='lg' text={title} className='font-extrabold' />

					<p className='text-lg text-gray-400'>{text}</p>
				</div>

				<div className='mt-11 flex gap-5'>
					<Link href='/'>
						<Button variant='default' size='lg' className='transition-colors duration-300 ease-in-out'>
							<ArrowLeft size={16} />
							На головну
						</Button>
					</Link>

					<Link href=''>
						<Button variant='outline' size='lg' className='transition-colors duration-300 ease-in-out'>
							Оновити
						</Button>
					</Link>
				</div>
			</div>

			<Image src={imageUrl} alt={title} width={300} height={300} />
		</div>
	)
}

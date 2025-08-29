'use client'

import Image from 'next/image'
import { XIcon } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import { useEffect, useState } from 'react'

import { cn } from '@/lib'
import { Api } from '@/services/api-client'
import { IStory } from '@/services/stories'
import { Container } from '@/components/shared'

interface Props {
	className?: string
}

export const Stories = ({ className }: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [stories, setStories] = useState<IStory[]>([])
	const [selectedStory, setSelectedStory] = useState<IStory>()

	useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll()
			setStories(data)
		}

		fetchStories()
	}, [])

	const onClickStory = (story: IStory) => {
		setSelectedStory(story)

		if (story.items.length > 0) {
			setOpen(true)
		}
	}

	return (
		<>
			<Container className={cn('my-10 flex items-center justify-between gap-2', className)}>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div key={index} className='h-[250px] w-50 animate-pulse rounded-md bg-gray-200' />
					))}

				{stories.map((story) => {
					const bdImagePath = story.imageUrl
					const imageUrl = `${bdImagePath}.webp`

					return (
						<button
							key={story.id}
							type='button'
							onClick={() => onClickStory(story)}
							aria-label='Open story'
							className='cursor-pointer rounded-md'
						>
							<Image src={imageUrl} alt='story' height={250} width={200} className='rounded-md' />
						</button>
					)
				})}

				{open && (
					<div className='absolute top-0 left-0 z-30 flex size-full items-center justify-center bg-black/80'>
						<div className='relative' style={{ width: 520 }}>
							<button
								className='absolute -top-5 -right-10 z-30 cursor-pointer transition-colors duration-300 ease-in-out'
								onClick={() => setOpen(false)}
							>
								<XIcon className='absolute top-0 right-0 size-8 text-white/50' />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={
									selectedStory?.items.map((item) => {
										const bdImagePath = item.sourceUrl
										const storyImageUrl = `${bdImagePath}.webp`

										return { url: storyImageUrl }
									}) || []
								}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	)
}

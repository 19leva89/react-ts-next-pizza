'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
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
	const [stories, setStories] = useState<IStory[]>([])
	const [open, setOpen] = useState(false)
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
			<Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div key={index} className="w-50 h-[250px] bg-gray-200 rounded-md animate-pulse" />
					))}

				{stories.map((story) => {
					const bdImagePath = story.imageUrl
					const imageUrl = `${bdImagePath}.webp`

					return (
						<Image
							key={story.id}
							onClick={() => onClickStory(story)}
							className="rounded-md cursor-pointer"
							height={250}
							width={200}
							src={imageUrl}
							alt="story"
						/>
					)
				})}

				{open && (
					<div className="absolute left-0 top-0 size-full bg-black/80 flex items-center justify-center z-30">
						<div className="relative" style={{ width: 520 }}>
							<button
								className="absolute -right-10 -top-5 z-30 cursor-pointer transition-colors ease-in-out duration-300"
								onClick={() => setOpen(false)}
							>
								<X className="absolute top-0 right-0 size-8 text-white/50" />
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

import { InfoBlock } from '@/components/shared/info-block'

const NotFoundPage = () => {
	return (
		<div className='mt-40 flex flex-col items-center justify-center'>
			<InfoBlock
				type='not-found'
				title='Сторінку не знайдено'
				text='Перевірте коректність введеної адреси або повторіть спробу пізніше'
				imageUrl='/assets/img/not-found.png'
			/>
		</div>
	)
}

export default NotFoundPage

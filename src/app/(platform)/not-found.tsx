import { InfoBlock } from '@/components/shared/info-block'

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Сторінку не знайдено"
				text="Перевірте коректність введеної адреси або повторіть спробу пізніше"
				imageUrl="/assets/img/not-found.png"
			/>
		</div>
	)
}

export default NotFoundPage

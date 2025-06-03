import { InfoBlock } from '@/components/shared'

const CancelOrderPage = () => {
	return (
		<div className='mt-40 flex flex-col items-center justify-center'>
			<InfoBlock
				title='Замовлення скасовано'
				text='Нам дуже прикро, що так сталося!'
				imageUrl='/assets/svg/cancel-order.svg'
			/>
		</div>
	)
}

export default CancelOrderPage

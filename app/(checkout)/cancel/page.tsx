import { InfoBlock } from '@/components/shared'

export default function CancelOrder() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Замовлення скасовано"
				text="Нам дуже прикро, що так сталося!"
				imageUrl="/assets/img/cancel-order.svg"
			/>
		</div>
	)
}

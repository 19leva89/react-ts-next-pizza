import { InfoBlock } from '@/components/shared'

const UnauthorizedPage = () => {
	return (
		<div className='mt-40 flex flex-col items-center justify-center'>
			<InfoBlock
				title='Доступ заборонено'
				text='Цю сторінку можуть переглядати лише авторизовані користувачі'
				imageUrl='/assets/img/lock.png'
			/>
		</div>
	)
}

export default UnauthorizedPage

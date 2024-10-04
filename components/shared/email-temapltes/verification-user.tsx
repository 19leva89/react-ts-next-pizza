import { FC } from 'react'

interface Props {
	code: string
}

export const VerificationUserTemplate: FC<Props> = ({ code }) => (
	<div>
		<p>
			Код підтвердження: <h2>{code}</h2>
		</p>

		<p>
			<a
				href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${process.env.NEXT_PUBLIC_API_URL}/auth/verify?code=${code}`}
			>
				Підтвердити реєстрацію
			</a>
		</p>
	</div>
)

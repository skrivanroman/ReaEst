import Home from './(home)/home/page'
import Wrapper from './layout-wrapper/wrapper'

export const metadata = {
	title: 'Reaest',
}

export default function MainRoot() {
	return (
		<Wrapper>
			<Home />
		</Wrapper>
	)
}

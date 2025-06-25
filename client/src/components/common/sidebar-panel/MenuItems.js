const MenuItems = () => {
	const menuItems = [
		{ id: 1, title: 'Domy' },
		{ id: 2, title: 'Byty' },
		{ id: 3, title: 'Kanceláře' },
		{ id: 4, title: 'Chalupy' },
		{ id: 5, title: 'Pozemky' },
		{ id: 6, title: 'Projekty' },
		{ id: 7, title: 'Ostatní' },
	]

	return (
		<ul className="navbar-nav">
			{menuItems.map((item) => (
				<li className="nav-item" key={item.id}>
					<a className="nav-link" href="#" role="button">
						{item.title}
					</a>
				</li>
			))}
		</ul>
	)
}

export default MenuItems

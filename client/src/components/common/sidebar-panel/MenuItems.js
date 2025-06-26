const MenuItems = () => {
	const menuItems = [
		{ id: 1, title: 'Domy', category: 'house' },
		{ id: 2, title: 'Byty', category: 'flat' },
		{ id: 3, title: 'Kanceláře', category: 'office' },
		{ id: 4, title: 'Chalupy', category: 'cottage' },
		{ id: 5, title: 'Pozemky', category: 'land' },
		{ id: 6, title: 'Projekty', category: 'projekt' },
		{ id: 7, title: 'Ostatní', category: 'other' },
	]

	return (
		<ul className="navbar-nav">
			{menuItems.map((item) => (
				<li className="nav-item" key={item.id}>
					<a className="nav-link" href={`/grid-full-3-col?category=${item.category}`} role="button">
						{item.title}
					</a>
				</li>
			))}
		</ul>
	)
}

export default MenuItems

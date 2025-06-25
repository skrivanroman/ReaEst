import React from 'react'

const MenuWidget = () => {
	const menuSections = [
		{
			title: 'Oblíbené',
			links: [
				{ label: 'Byty na pronájem', href: '#' },
				{ label: 'Kanceláře na koupi', href: '#' },
				{ label: 'Kanceláře na pronájem', href: '#' },
			],
		},
		{
			title: 'Odkazy',
			links: [
				{ label: 'Podmínky použití', href: '#' },
				{ label: 'Soukromí', href: '#' },
				{ label: 'Ceny', href: '#' },
				{ label: 'Naše služby', href: '#' },
				{ label: 'Kontaktovat podporu', href: '#' },
				{ label: 'Často kladené otázky', href: '#' },
			],
		},
		{
			title: 'Objevte',
			links: [
				{ label: 'Praha', href: '#' },
				{ label: 'Vídeň', href: '#' },
				{ label: 'Ostrava', href: '#' },
				{ label: 'Rovinij', href: '#' },
			],
		},
	]

	return (
		<>
			{menuSections.map((section, index) => (
				<div className="col-auto" key={index}>
					<div className="link-style1 mb-3">
						<h6 className="text-white mb25">{section.title}</h6>
						<ul className="ps-0">
							{section.links.map((link, linkIndex) => (
								<li key={linkIndex}>
									<a href={link.href}>{link.label}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</>
	)
}

export default MenuWidget

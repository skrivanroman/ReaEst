module.exports = [
	{
		label: 'Domů',
		subMenu: [{ path: '/home', label: 'Domů' }],
	},
	{
		label: 'Nabídky',
		subMenu: [
			{
				label: 'Hledání',
				subMenu: [
					{ label: 'Default', path: '/grid-default' },
					{ label: '3 sloupce', path: '/grid-full-3-col' },
				],
			},
			{
				label: 'Mapa',
				subMenu: [{ label: 'Ukázka', path: '/map-v4' }],
			},
		],
	},
	{
		label: 'Nemovitosti',
		subMenu: [
			{
				label: 'Makléř',
				subMenu: [{ label: 'Šablona', path: '/agent-single/1' }],
			},

			{
				label: 'Inzerát',
				subMenu: [{ label: 'Šablona', path: '/single-v1/1' }],
			},
		],
	},
	{
		label: 'Ovládací panel',
		subMenu: [
			{ label: 'Domů', path: '/dashboard-home' },
			{ label: 'Zprávy', path: '/dashboard-message' },
			{ label: 'Nahrát Inzerát', path: '/dashboard-add-property' },
			{ label: 'Moje Inzeráty', path: '/dashboard-my-properties' },
			{ label: 'Moje Oblíbené', path: '/dashboard-my-favourites' },
			{ label: 'Uložené', path: '/dashboard-saved-search' },
			{ label: 'Hodnocení', path: '/dashboard-reviews' },
			{ label: 'Moje Balíčky', path: '/dashboard-my-package' },
			{ label: 'Můj Profil', path: '/dashboard-my-profile' },
		],
	},
	{
		label: 'Blog',
		subMenu: [
			{ path: '/blog-list-v3', label: 'Blog List' },
			{ path: '/blogs/2', label: 'Šablona' },
		],
	},

	{
		label: 'Stránky',
		subMenu: [
			{ path: '/about', label: 'O nás' },
			{ path: '/contact', label: 'Kontakt' },
			{ path: '/pricing', label: 'Cenník' },
			{ path: '/faq', label: 'FAQ' },
			{ path: '/login', label: 'Přihlášení' },
			{ path: '/register', label: 'Registrace' },
			{ path: '/404', label: '404' },
		],
	},
]

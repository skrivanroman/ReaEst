export const homeItems = [{ href: '/', label: 'Domů' }]

export const listingItems = [
	{
		title: 'Hledání',
		submenu: [
			{ label: 'Hledání default', href: '/grid-default' },
			{ label: 'Hledání 3 sloupce', href: '/grid-full-3-col' },
		],
	},
	{
		title: 'Mapa',
		submenu: [{ label: 'Ukázka', href: '/map-v4' }],
	},
]

export const propertyItems = [
	{
		label: 'Makléři',
		subMenuItems: [{ label: 'Šablona', href: '/agent-single/1' }],
	},

	{
		label: 'Inzerát',
		subMenuItems: [{ label: 'Šablona', href: '/single-v1/1' }],
	},
	{
		label: 'Ovládací panel',
		subMenuItems: [
			{ label: 'Domů', href: '/dashboard-home' },
			{ label: 'Zprávy', href: '/dashboard-message' },
			{ label: 'Nahrát inzerát', href: '/dashboard-add-property' },
			{ label: 'Moje inzeráty', href: '/dashboard-my-properties' },
			{ label: 'Moje oblíbené', href: '/dashboard-my-favourites' },
			{ label: 'Uložené', href: '/dashboard-saved-search' },
			{ label: 'Hodnocení', href: '/dashboard-reviews' },
			{ label: 'Moje balíčky', href: '/dashboard-my-package' },
			{ label: 'Můj profil', href: '/dashboard-my-profile' },
		],
	},
]

export const blogItems = [
	{ href: '/blog-list-v3', label: 'Blog list' },
	{ href: '/blogs/2', label: 'Blog šablona' },
]

export const pageItems = [
	{ href: '/about', label: 'O nás' },
	{ href: '/contact', label: 'Kontakt' },
	{ href: '/pricing', label: 'Cenník' },
	{ href: '/faq', label: 'Často kladené otázky' },
	{ href: '/login', label: 'Přihlášení' },
	{ href: '/register', label: 'Registrace' },
	{ href: '/not-found', label: '404' },
]

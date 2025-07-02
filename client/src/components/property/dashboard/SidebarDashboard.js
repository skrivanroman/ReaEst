'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const SidebarDashboard = () => {
	const pathname = usePathname()

	const sidebarItems = [
		{
			title: 'Hlavní',
			items: [
				{
					href: '/dashboard-home',
					icon: 'flaticon-discovery',
					text: 'Ovládací Panel',
				},
				{
					href: '/dashboard-message',
					icon: 'flaticon-chat-1',
					text: 'Zprávy',
				},
			],
		},
		{
			title: 'Správa Inzerátů',
			items: [
				{
					href: '/dashboard-add-property',
					icon: 'flaticon-new-tab',
					text: 'Nahrát Inzerát',
				},
				{
					href: '/dashboard-my-properties',
					icon: 'flaticon-home',
					text: 'Moje Inzeráty',
				},
				{
					href: '/dashboard-my-favourites',
					icon: 'flaticon-like',
					text: 'Moje oblíbené',
				},
				{
					href: '/dashboard-saved-search',
					icon: 'flaticon-search-2',
					text: 'Uložené',
				},
				{
					href: '/dashboard-reviews',
					icon: 'flaticon-review',
					text: 'Hodnocení',
				},
			],
		},
		{
			title: 'Správa Účtu',
			items: [
				{
					href: '/dashboard-my-package',
					icon: 'flaticon-protection',
					text: 'Moje balíčky',
				},
				{
					href: '/dashboard-my-profile',
					icon: 'flaticon-user',
					text: 'Můj Profil',
				},
				{
					href: '/login',
					icon: 'flaticon-logout',
					text: 'Odhlásit',
				},
			],
		},
	]

	return (
		<div className="dashboard__sidebar d-none d-lg-block">
			<div className="dashboard_sidebar_list">
				{sidebarItems.map((section, sectionIndex) => (
					<div key={sectionIndex}>
						<p className={`fz15 fw400 ff-heading ${sectionIndex === 0 ? 'mt-0' : 'mt30'}`}>{section.title}</p>
						{section.items.map((item, itemIndex) => (
							<div key={itemIndex} className="sidebar_list_item">
								<Link href={item.href} className={`items-center   ${pathname == item.href ? '-is-active' : ''} `}>
									<i className={`${item.icon} mr15`} />
									{item.text}
								</Link>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default SidebarDashboard

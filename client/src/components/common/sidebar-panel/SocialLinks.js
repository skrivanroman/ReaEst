const SocialLinks = () => {
	const socialLinks = [
		{
			id: 1,
			iconClass: 'fab fa-facebook-f',
			href: 'https://www.facebook.com/share/yvi67yxJPGzEksx4/',
		},
		{
			id: 2,
			iconClass: 'fab fa-instagram',
			href: 'https://www.instagram.com/reaest_com/',
		},
		{
			id: 3,
			iconClass: 'fab fa-youtube',
			href: 'https://youtube.com/@reaest-com?si=3VvAzyWd9W5mWmib',
		},
		{
			id: 4,
			iconClass: 'fab fa-tiktok',
			href: 'https://www.tiktok.com/@reaest.com?_t=8qchsLjqizR&_r=1',
		},
	]

	return (
		<>
			{socialLinks.map((link) => (
				<a className="me-3" href={link.href} key={link.id}>
					<i className={link.iconClass}></i>
				</a>
			))}
		</>
	)
}

export default SocialLinks

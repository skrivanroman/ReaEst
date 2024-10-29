import React from 'react'

const Social = ({ large = false }) => {
	const socialIcons = [
		{ iconClass: 'fab fa-facebook-f', link: 'https://www.facebook.com/share/yvi67yxJPGzEksx4/' },
		{
			iconClass: 'fab fa-instagram',
			link: 'https://www.instagram.com/reaest_com/',
		},
		{ iconClass: 'fab fa-youtube', link: 'https://youtube.com/@reaest-com?si=3VvAzyWd9W5mWmib' },
		{ iconClass: 'fab fa-tiktok', link: 'https://www.tiktok.com/@reaest.com?_t=8qchsLjqizR&_r=1' },
	]

	return (
		<div className="social-style1">
			{socialIcons.map(({ iconClass, link }, index) => (
				<a key={index} href={link} target="_blank" style={large ? { 'font-size': '100px' } : {}}>
					<i className={iconClass + ' list-inline-item'} />
				</a>
			))}
		</div>
	)
}

export default Social

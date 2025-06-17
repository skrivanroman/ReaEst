import Image from 'next/image'
import React from 'react'

const Office = () => {
	const offices = [
		{
			id: 1,
			city: 'Facebook',
			iconClass: 'fab fa-facebook-f',
			link: 'https://www.facebook.com/share/yvi67yxJPGzEksx4/',
			icon: '/images/icon/paris.svg',
			address: '1301 2nd Ave, Seattle, WA 98101',
			phoneNumber: '(315) 905-2321',
		},
		{
			id: 2,
			city: 'London',
			link: 'https://www.instagram.com/reaest_com/',
			iconClass: 'fab fa-instagram',
			icon: '/images/icon/london.svg',
			address: '1301 2nd Ave, Seattle, WA 98101',
			phoneNumber: '(315) 905-2321',
		},
		{
			id: 3,
			city: 'New York',
			link: 'https://youtube.com/@reaest-com?si=3VvAzyWd9W5mWmib',
			iconClass: 'fab fa-youtube',
			icon: '/images/icon/new-york.svg',
			address: '1301 2nd Ave, Seattle, WA 98101',
			phoneNumber: '(315) 905-2321',
		},
		{
			id: 4,
			iconClass: 'fab fa-tiktok',
			link: 'https://www.tiktok.com/@reaest.com?_t=8qchsLjqizR&_r=1',
		},
		// Add more office objects here...
	]

	return (
		<>
			{offices.map((office) => (
				<div
					className="col-sm-6 col-lg-4 text-center"
					key={office.id}
					style={{ width: '100px', height: '100px', 'text-align': 'left' }}
				>
					<div className="iconbox-style8 ">
						<div className="social-style1 text-center">
							<a key={office.id} href={office.link} target="_blank" style={{ 'font-size': '40px' }}>
								<i className={office.iconClass} style={{ color: 'black', marginLeft: '-18px' }} />
							</a>
						</div>
						{/*<div className="icon">
              <Image width={120} height={120} src={office.icon} alt="icon" />
            </div>*/}
						{/*<div className="iconbox-content">
							<h4 className="title">{office.city}</h4>
							<p className="text mb-1">{office.address}</p>
              <h6 className="mb10">{office.phoneNumber}</h6>
              <a className="text-decoration-underline" href="#">
                Open Google Map
              </a>
						</div>*/}
					</div>
				</div>
			))}
		</>
	)
}

export default Office

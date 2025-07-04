'use client'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

const ExploreCities = () => {
	let cities = [
		{
			id: 1,
			name: 'Praha',
			image: '/images/cities/foto-Praha.jpg',
			href: 'Praha',
			number: 12,
		},
		{
			id: 2,
			name: 'Ostrava',
			image: '/images/cities/foto-Ostrava.jpg',
			href: 'Ostrava',
			number: 8,
		},
		{
			id: 3,
			name: 'Vídeň',
			image: '/images/cities/foto-Wien.jpg',
			href: 'Viden',
			number: 15,
		},
		{
			id: 4,
			name: 'Rovinij',
			image: '/images/cities/foto-rovinj.jpg',
			href: 'Rovinij',
			number: 10,
		},
		// Add more cities if needed
	]

	return (
		<>
			<Swiper
				spaceBetween={30}
				modules={[Navigation, Pagination]}
				navigation={{
					nextEl: '.cities_next__active',
					prevEl: '.cities_prev__active',
				}}
				pagination={{
					el: '.cities_pagination__active',
					clickable: true,
				}}
				breakpoints={{
					300: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
					1200: {
						slidesPerView: 4,
					},
				}}
			>
				{cities.map((city) => (
					<SwiperSlide key={city.id}>
						<div className="item">
							<Link href={`/grid-full-3-col?city=${city.href}`}>
								<div className="feature-style2 mb30">
									<div className="feature-img">
										<Image
											width={279}
											height={279}
											className="w-100 h-100 cover"
											src={city.image}
											alt="city listings"
										/>
									</div>
									<div className="feature-content pt20">
										<h6 className="title mb-1">{city.name}</h6>
										<p className="text fz15">{city.number} inzerátů</p>
									</div>
								</div>
							</Link>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default ExploreCities

'use client'
import listings from '@/data/listings'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import { useEffect, useState } from 'react'

const FeaturedListings = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/property/?limit=10`)
			const data = await response.json()
			console.log(data)
			setPosts(data.properties)
		}
		fetchPosts()
	}, [])

	return (
		<>
			<Swiper
				spaceBetween={30}
				modules={[Navigation, Pagination]}
				navigation={{
					nextEl: '.featured-next__active',
					prevEl: '.featured-prev__active',
				}}
				pagination={{
					el: '.featured-pagination__active',
					clickable: true,
				}}
				slidesPerView={1}
				breakpoints={{
					300: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 3,
					},
				}}
			>
				{posts.map((listing) => (
					<SwiperSlide key={listing.uuid}>
						<div className="item">
							<div className="listing-style1 mb-0">
								<div className="list-thumb">
									<Image
										width={382}
										height={248}
										className="w-100 h-100 cover"
										src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/properties/${listing.uuid}/0.jpg`}
										alt="listings"
									/>
									<div className="sale-sticker-wrap">
										{!listing.forRent && (
											<div className="list-tag fz12">
												<span className="flaticon-electricity me-2" />
												TOP
											</div>
										)}
									</div>
									<div className="list-price">
										{listing.price} ,-Kč/ <span>měsíc</span>
									</div>
								</div>
								<div className="list-content">
									<h6 className="list-title">
										<Link href={`/single-v1/${listing.uuid}`}>{listing.title}</Link>
									</h6>
									<p className="list-text">{listing.city}</p>
									<div className="list-meta d-flex align-items-center">
										<a href="#">
											<span className="flaticon-bed" /> {listing.bedroomCount} Ložnice
										</a>
										<a href="#">
											<span className="flaticon-shower" /> {listing.bathroomCount} Koupelny
										</a>
										<a href="#">
											<span className="flaticon-expand" /> {listing.size} m<sup>2</sup>
										</a>
									</div>
									<hr className="mt-2 mb-2" />
									<div className="list-meta2 d-flex justify-content-between align-items-center">
										<span className="for-what">{listing.payType === 'rent' ? 'pronájem' : 'koupit'}</span>
										<div className="icons d-flex align-items-center">
											<a href="#">
												<span className="flaticon-fullscreen" />
											</a>
											<a href="#">
												<span className="flaticon-new-tab" />
											</a>
											<a href="#">
												<span className="flaticon-like" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="rounded-arrow arrowY-center-position">
				<button className="featured-prev__active swiper_button _prev">
					<i className="far fa-chevron-left" />
				</button>
				{/* End prev */}

				<button className="featured-next__active swiper_button _next">
					<i className="far fa-chevron-right" />
				</button>
				{/* End Next */}
			</div>
			{/* End .col for navigation  */}
		</>
	)
}

export default FeaturedListings

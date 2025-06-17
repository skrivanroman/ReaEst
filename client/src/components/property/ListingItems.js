import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ListingItems = ({ data }) => {
	return (
		<>
			{data?.map((listing) => (
				<div className="col-md-6" key={listing.uuid}>
					<div className="listing-style1">
						<div className="list-thumb">
							<Image
								width={382}
								height={248}
								className="w-100 h-100 cover"
								src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${listing.uuid}/0.jpg`}
								alt="listings"
							/>
							<div className="sale-sticker-wrap">
								{listing.featured && (
									<div className="list-tag fz12">
										<span className="flaticon-electricity me-2" />
										TOP
									</div>
								)}
							</div>

							<div className="list-price">
								{listing.price} / <span>mo</span>
							</div>
						</div>
						<div className="list-content">
							<h6 className="list-title">
								<Link href={`/single-v1/${listing.uuid}`}>{listing.title}</Link>
							</h6>
							<p className="list-text">{listing.country}</p>
							<div className="list-meta d-flex align-items-center">
								<a href="#">
									<span className="flaticon-bed" /> {listing.bedroomCount}
								</a>
								<a href="#">
									<span className="flaticon-shower" /> {listing.bathroomCount}
								</a>
								<a href="#">
									<span className="flaticon-expand" /> {listing.size} m2
								</a>
							</div>
							<hr className="mt-2 mb-2" />
							<div className="list-meta2 d-flex justify-content-between align-items-center">
								<span className="for-what">Na pronájem</span>
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
			))}
		</>
	)
}

export default ListingItems

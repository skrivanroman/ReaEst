'use client'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import Image from 'next/image'
import listings from '@/data/listings'

const PropertyGallery = ({ id, imagesCount }) => {
	const images = []
	for (let i = 0; i < imagesCount; i++) {
		images.push({
			src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}/${i}.jpg`,
			alt: `img${i}.jpg`,
			thumb: `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}/${i}-thumb.jpg`,
		})
	}
	return (
		<>
			<Gallery>
				<div className="col-sm-6">
					<div className="sp-img-content mb15-md">
						<div className="popup-img preview-img-1 sp-img">
							<Item original={images?.[0]?.src} thumbnail={images?.[0]?.src} width={2560} height={1707}>
								{({ ref, open }) => (
									<Image
										src={images[0]?.src || '/#'}
										width={591}
										height={558}
										ref={ref}
										onClick={open}
										alt="image"
										role="button"
										className="w-100 h-100 cover"
									/>
								)}
							</Item>
						</div>
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6">
					<div className="row">
						{images.slice(1, 5).map((image, index) => (
							<div className="col-6 ps-sm-0" key={index}>
								<div className="sp-img-content">
									<div className={`popup-img preview-img-${index + 2} sp-img mb10`}>
										<Item original={image.src} thumbnail={image.src} width={270 * 3} height={250 * 3}>
											{({ ref, open }) => (
												<Image
													width={270 * 1}
													height={250 * 1}
													className="w-100 h-100 cover"
													ref={ref}
													onClick={open}
													role="button"
													src={image.thumb}
													alt={image.alt}
												/>
											)}
										</Item>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Gallery>
		</>
	)
}

export default PropertyGallery

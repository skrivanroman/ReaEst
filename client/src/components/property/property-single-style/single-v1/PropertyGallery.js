'use client'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const PropertyGallery = ({ id, photos, imagesCount }) => {
	const [loaded, setLoaded] = useState(false)
	const [images, setImages] = useState([])

	useEffect(() => {
		const imagesTemp = []
		for (let i = 0; i < imagesCount; i++) {
			imagesTemp.push({
				src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/properties/${id}/${i}.${photos[i].format}`,
				alt: `img${i}.jpg`,
				thumb: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/properties/${id}/${i}-thumb.jpg`,
				width: photos[i]?.width || 0,
				height: photos[i]?.height || 0,
			})
		}
		setImages(imagesTemp)
		setLoaded(true)
	}, [photos])

	if (!loaded || images.length === 0) {
		return <>Načítá se</>
	}
	return (
		<>
			<Gallery>
				<div className="col-sm-6">
					<div className="sp-img-content mb15-md">
						<div className="popup-img preview-img-1 sp-img">
							<Item
								original={images?.[0]?.src}
								thumbnail={images?.[0]?.thumb}
								width={images?.[0]?.width}
								height={images?.[0]?.height}
							>
								{({ ref, open }) => (
									<Image
										priority
										src={images[0]?.thumb}
										thumbnail={images[0]?.thumb}
										width={640}
										height={452}
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
										<Item original={image.src} thumbnail={image.thumb} width={image.width} height={image.height}>
											{({ ref, open }) => (
												<Image
													width={270}
													height={250}
													className="w-100 h-100 cover"
													ref={ref}
													onClick={open}
													role="button"
													src={image.thumb}
													thumbnail={image.thumb}
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
				{images.slice(5).map((image, index) => (
					<Item original={image.src} width={image.width} height={image.height} key={index}>
						{({ ref }) => <div ref={ref} style={{ display: 'none' }} />}
					</Item>
				))}
			</Gallery>
		</>
	)
}

export default PropertyGallery

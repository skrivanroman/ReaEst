'use client'
import React, { useRef, useState } from 'react'
import PropertyDescription from './property-description'
import UploadMedia from './upload-media'
import LocationField from './LocationField'
import DetailsFiled from './details-field'
import Amenities from './Amenities'
import useForm from '@/utilis/useForm'

const AddPropertyTabContent = () => {
	const [formData, updateForm, setFormState] = useForm({ category: 'flat', payType: 'buy', price: 0, title: '' })
	const [uploadedImages, setUploadedImages] = useState([])
	const [uploadedImagesSize, setUploadedImagesSize] = useState({ size: 0, error: false })
	const [isUploading, setIsUploading] = useState(false)
	const [isUploaded, setIsUploaded] = useState({ done: false, error: false })

	const uploadProperty = async (event) => {
		event.preventDefault()
		setIsUploading(true)
		setIsUploaded({ done: false, error: false })
		const reqBody = new FormData()
		reqBody.append('data', JSON.stringify({ ...formData }))
		uploadedImages.forEach((image) => reqBody.append('images', image.file))
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/property`, {
			method: 'POST',
			credentials: 'include',
			body: reqBody,
		})
		setIsUploading(false)
		if (response.ok) {
			console.log('Property uploaded')
			setIsUploaded({ done: true, error: false })
			//setFormState({})
		} else {
			setIsUploaded({ done: true, error: true })
			console.log('Failed to upload property')
			console.log(response)
			console.log(reqBody)
		}
	}

	const updateSelect = (selected, { name }) => {
		if (Array.isArray(selected)) {
			setFormState({ ...formData, [name]: selected.map(({ value }) => value) })
		} else {
			setFormState({ ...formData, [name]: selected.value })
		}
	}

	return (
		<>
			<nav>
				<div className="nav nav-tabs" id="nav-tab2" role="tablist">
					<button
						className="nav-link active fw600 ms-3"
						id="nav-item1-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-item1"
						type="button"
						role="tab"
						aria-controls="nav-item1"
						aria-selected="true"
					>
						1. Popis
					</button>
					<button
						className="nav-link fw600"
						id="nav-item2-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-item2"
						type="button"
						role="tab"
						aria-controls="nav-item2"
						aria-selected="false"
					>
						2. Obrázky
					</button>
					<button
						className="nav-link fw600"
						id="nav-item3-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-item3"
						type="button"
						role="tab"
						aria-controls="nav-item3"
						aria-selected="false"
					>
						3. Lokace
					</button>
					<button
						className="nav-link fw600"
						id="nav-item4-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-item4"
						type="button"
						role="tab"
						aria-controls="nav-item4"
						aria-selected="false"
					>
						4. Detaily
					</button>
					<button
						className="nav-link fw600"
						id="nav-item5-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-item5"
						type="button"
						role="tab"
						aria-controls="nav-item5"
						aria-selected="false"
					>
						5. Vybavení
					</button>
				</div>
			</nav>
			{/* End nav tabs */}

			<div className="tab-content" id="nav-tabContent">
				<div className="tab-pane fade show active" id="nav-item1" role="tabpanel" aria-labelledby="nav-item1-tab">
					<div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
						<h4 className="title fz17 mb30">Popis nemovitosti</h4>
						<PropertyDescription {...{ updateForm, updateSelect }} />
					</div>
				</div>
				{/* End tab for Property Description */}

				<div className="tab-pane fade" id="nav-item2" role="tabpanel" aria-labelledby="nav-item2-tab">
					<UploadMedia {...{ uploadedImages, setUploadedImages, uploadedImagesSize, setUploadedImagesSize }} />
				</div>
				{/* End tab for Upload photos of your property */}

				<div className="tab-pane fade" id="nav-item3" role="tabpanel" aria-labelledby="nav-item3-tab">
					<div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
						<h4 className="title fz17 mb30">Adresa nemovitosti</h4>
						<LocationField {...{ updateForm, updateSelect }} />
					</div>
				</div>
				{/* End tab for Listing Location */}

				<div className="tab-pane fade" id="nav-item4" role="tabpanel" aria-labelledby="nav-item4-tab">
					<div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
						<h4 className="title fz17 mb30">Detaily nemovitosti</h4>
						<DetailsFiled {...{ updateForm }} />
					</div>
				</div>
				{/* End tab for Listing Details */}
				<div className="tab-pane fade" id="nav-item5" role="tabpanel" aria-labelledby="nav-item5-tab">
					<div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
						<h4 className="title fz17 mb30">Vybavení nemovitosti</h4>
						<div className="row">
							<Amenities />
						</div>
					</div>
				</div>
				{/*	 End tab for Select Amenities */}
			</div>
			<button className="ud-btn btn-white bdrs60 mx-2 mx-xl-4" onClick={uploadProperty}>
				Nahrát
			</button>
			{isUploading ? <p> Zpracovává se... </p> : ''}
			{uploadedImagesSize.error ? <p> Velikost obrázků nesmí přesahovat 200MB </p> : ''}
			{isUploaded.done ? isUploaded.error ? <p> Při nahrávání nastala chyba </p> : <p> Nahráno správně </p> : ''}
		</>
	)
}

export default AddPropertyTabContent

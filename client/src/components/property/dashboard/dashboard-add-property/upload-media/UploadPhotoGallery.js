import { Tooltip as ReactTooltip } from 'react-tooltip'
import React, { useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'

const UploadPhotoGallery = ({ uploadedImages, setUploadedImages, uploadedImagesSize, setUploadedImagesSize }) => {
	const fileInputRef = useRef(null)

	const handleUpload = (files) => {
		const newImages = Array.from(files).map((file) => ({
			file,
			previewUrl: URL.createObjectURL(file),
		}))
		const newSize = newImages.reduce((acc, { file }) => acc + file.size, 0)
		const updatedSize = uploadedImagesSize.size + newSize

		if (updatedSize > parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_UPLOAD_MB) * 1024 * 1024) {
			setUploadedImagesSize({ size: updatedSize, error: true })
			return
		}

		setUploadedImages((prev) => [...prev, ...newImages])
		setUploadedImagesSize({ size: updatedSize, error: false })
	}

	const handleDrop = (event) => {
		event.preventDefault()
		const files = event.dataTransfer.files
		handleUpload(files)
	}

	const handleDragOver = (event) => {
		event.preventDefault()
	}

	const handleButtonClick = () => {
		fileInputRef.current.click()
	}

	const handleDelete = (index) => {
		URL.revokeObjectURL(uploadedImages[index].reviewUrl)
		setUploadedImagesSize((prev) => ({ size: prev.size - (uploadedImages[index].file.size || 0), error: prev.error }))
		const newImages = [...uploadedImages]
		newImages.splice(index, 1)
		setUploadedImages(newImages)
	}

	useEffect(() => {
		return () => {
			uploadedImages.forEach((img) => URL.revokeObjectURL(img.previewUrl))
		}
	}, [])

	const jsx = useMemo(
		() => (
			<>
				<div
					className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					<div className="icon mb30">
						<span className="flaticon-upload" />
					</div>
					<h4 className="title fz17 mb10">Přetáhněte obrázky</h4>
					<label className="ud-btn btn-white">
						Otevřít soubory
						<input
							ref={fileInputRef}
							id="fileInput"
							type="file"
							multiple
							className="ud-btn btn-white"
							onChange={(e) => handleUpload(e.target.files)}
							style={{ display: 'none' }}
						/>
					</label>
				</div>

				{/* Display uploaded images */}
				<div className="row profile-box position-relative d-md-flex align-items-end mb50">
					{uploadedImages.map((imageData, index) => (
						<div className="col-2" key={index}>
							<div className="profile-img mb20 position-relative">
								<Image
									width={212}
									height={194}
									className="w-100 bdrs12 cover"
									src={imageData.previewUrl}
									alt={`Uploaded Image ${index + 1}`}
								/>
								<button
									style={{ border: 'none' }}
									className="tag-del"
									title="Delete Image"
									onClick={() => handleDelete(index)}
									type="button"
									data-tooltip-id={`delete-${index}`}
								>
									<span className="fas fa-trash-can" />
								</button>

								<ReactTooltip id={`delete-${index}`} place="right" content="Delete Image" />
							</div>
						</div>
					))}
				</div>
			</>
		),
		[uploadedImages]
	)
	return jsx
}

export default UploadPhotoGallery

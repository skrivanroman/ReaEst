import React from 'react'
import SelectMulitField from './SelectMulitField'
import Map from './Map'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react'

const LocationField = ({ updateForm, updateSelect }) => {
	const [markerPosition, setMarkerPosition] = useState(null)

	return (
		<form className="form-style1">
			<div className="row">
				<div className="col-sm-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Ulice</label>
						<input name="street" type="text" className="form-control" onChange={updateForm} />
					</div>
				</div>
				{/* End col-12 */}

				<SelectMulitField {...{ updateSelect }} />

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Město</label>
						<input name="city" type="text" className="form-control" onChange={updateForm} />
					</div>
				</div>

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Poštovní směrovací číslo</label>
						<input name="zipCode" type="text" className="form-control" onChange={updateForm} />
					</div>
				</div>
				{/* End col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Městská část</label>
						<input name="cityPart" type="text" className="form-control" placeholder="Praha 1" onChange={updateForm} />
					</div>
				</div>
				{/* End col-4 */}

				<div className="col-sm-12">
					<div className="mb20 mt30">
						<label className="heading-color ff-heading fw600 mb30">Vyberte lokaci</label>
						<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
							<GoogleMap
								mapContainerStyle={{ width: '100%', height: '400px' }}
								center={{ lat: 49.99847218040382, lng: 14.552303208401396 }}
								zoom={11}
								onClick={(e) => setMarkerPosition({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 })}
							>
								{markerPosition && <Marker position={markerPosition} />}
							</GoogleMap>
						</LoadScript>
					</div>
				</div>
				{/* End col-12 */}
			</div>
			{/* End .row */}

			<div className="row">
				<div className="col-sm-6 col-xl-4">
					<div className="mb30">
						<label className="heading-color ff-heading fw600 mb10">Zeměpisná šířka</label>
						<input
							name="lat"
							type="text"
							className="form-control"
							value={markerPosition?.lat || ''}
							onChange={updateForm}
						/>
					</div>
				</div>
				{/* End .col-sm-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb30">
						<label className="heading-color ff-heading fw600 mb10">Zeměpisná délka</label>
						<input
							name="lng"
							type="text"
							className="form-control"
							value={markerPosition?.lng || ''}
							onChange={updateForm}
						/>
					</div>
				</div>
			</div>
			{/* End .row */}
		</form>
	)
}

export default LocationField

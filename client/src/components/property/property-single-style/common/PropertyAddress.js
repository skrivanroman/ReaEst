import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const PropertyAddress = ({ data }) => {
	const addresses = [
		{
			address: 'Smetanovo nábřeží 14',
			city: 'Praha',
			state: 'Praha 1',
			zipCode: '110 00',
			area: 'Praha 1',
			country: 'Česká republika',
		},
		/* 
		{
			address: '10 Downing Street',
			city: 'London',
			state: 'Greater London',
			zipCode: 'SW1A 2AA',
			area: 'Westminster',
			country: 'United Kingdom',
		},
    */
	]

	return (
		<>
			{addresses.map((address, index) => (
				<div key={index} className={`col-md-6 col-xl-4 ${index === 1 ? 'offset-xl-2' : ''}`}>
					<div className="d-flex justify-content-between">
						<div className="pd-list">
							<p className="fw600 mb10 ff-heading dark-color">Ulice</p>
							<p className="fw600 mb10 ff-heading dark-color">Město</p>
							<p className="fw600 mb-0 ff-heading dark-color">Země</p>
						</div>
						<div className="pd-list">
							<p className="text mb10">{data.street}</p>
							<p className="text mb10">{data.city}</p>
							<p className="text mb-0">{data.country}</p>
						</div>
					</div>
				</div>
			))}
			{/* End col */}

			<div className="col-md-12">
				<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
					<GoogleMap
						mapContainerStyle={{ width: '100%', height: '400px' }}
						center={{ lat: parseFloat(data.lat || 49.99847218040382), lng: parseFloat(data.lng || 14.552303208401396) }}
						zoom={11}
					>
						{data.lat && <Marker position={{ lat: parseFloat(data.lat), lng: parseFloat(data.lng) }} />}
					</GoogleMap>
				</LoadScript>
				{/*<iframe
					className="position-relative bdrs12 mt30 h250"
					loading="lazy"
					//src={`https://maps.google.com/maps?q=${addresses[0].address}&t=m&z=14&output=embed&iwloc=near`}
					src={
						'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2560.12845524983!2d14.4130894!3d50.0838818!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94e57c679457%3A0x2b4e9f2d42bd6ae3!2zU21ldGFub3ZvIG7DoWLFmS4gMzI3LzE0LCAxMTAgMDAgU3RhcsOpIE3Em3N0bw!5e0!3m2!1sen!2scz!4v1729008391932!5m2!1sen!2scz'
						//'https://www.google.com/maps/place/Smetanovo+n%C3%A1b%C5%99.+327%2F14,+110+00+Star%C3%A9+M%C4%9Bsto,+Czechia/@50.0838818,14.4130894,17z/&output=embed'
					}
					title={data.street}
					aria-label={data.street}
				/>*/}
			</div>
			{/* End col */}
		</>
	)
}

export default PropertyAddress

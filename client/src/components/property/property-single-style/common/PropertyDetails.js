import React from 'react'

const PropertyDetails = ({ data }) => {
	const columns = [
		[
			{
				label: 'ID nemovitosti',
				value: data.customId,
			},
			{
				label: 'Cena',
				value: data.price + ',-Kč',
			},
			{
				label: 'Plocha',
				value: data.size + 'm2',
			},
			{
				label: 'Koupelny',
				value: data.bathroomCount,
			},
			{
				label: 'Ložnice',
				value: data.bedroomCount,
			},
		],
		[
			/*
			{
				label: 'Garage',
				value: '2',
			},
			{
				label: 'Garage Size',
				value: '200 SqFt',
			},
			{
				label: 'Year Built',
				value: '2022',
			},
			{
				label: 'Property Type',
				value: 'Apartment',
			},
			{
				label: 'Property Status',
				value: 'For Sale',
			},
      */
		],
	]

	return (
		<div className="row">
			{columns.map((column, columnIndex) => (
				<div key={columnIndex} className={`col-md-6 col-xl-4${columnIndex === 1 ? ' offset-xl-2' : ''}`}>
					{column.map((detail, index) => (
						<div key={index} className="d-flex justify-content-between">
							<div className="pd-list">
								<p className="fw600 mb10 ff-heading dark-color">{detail.label}</p>
							</div>
							<div className="pd-list">
								<p className="text mb10">{detail.value}</p>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default PropertyDetails

import React from 'react'

const PropertyDetails = () => {
	const columns = [
		[
			{
				label: 'ID nemovitosti',
				value: '2024.10',
			},
			{
				label: 'Cena',
				value: '19.900.000,-Kč',
			},
			{
				label: 'Plocha',
				value: '89 m2',
			},
			{
				label: 'Koupelny',
				value: '1',
			},
			{
				label: 'Ložnice',
				value: '1',
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

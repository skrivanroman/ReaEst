import listings from '@/data/listings'
import React from 'react'

const OverView = ({ id, data }) => {
	//const data = listings.filter((elm) => elm.id == id)[0] || listings[0]
	const overviewData = [
		{
			icon: 'flaticon-bed',
			label: 'Ložnice',
			value: data.bedroomCount || 0,
		},
		{
			icon: 'flaticon-shower',
			label: 'Koupelna',
			value: data.bathroomCount || 0,
		},
		{
			icon: 'flaticon-event',
			label: 'Rok výstavby',
			value: new Date(data.yearBuilt || new Date().getFullYear()).getFullYear(),
		},
		{
			icon: 'flaticon-garage',
			label: 'Garáže',
			value: data.garageCount || 0,
			xs: true,
		},
		{
			icon: 'flaticon-expand',
			label: 'm2',
			value: data.size || 0,
			xs: true,
		},
		{
			icon: 'flaticon-home-1',
			label: 'Typ nemovitosti',
			value: (data.payType || 'rent') === 'rent' ? 'Byt' : 'Dum',
		},
	]

	return (
		<>
			{overviewData.map((item, index) => (
				<div key={index} className={`col-sm-6 col-lg-4 ${item.xs ? 'mb25-xs' : 'mb25'}`}>
					<div className="overview-element d-flex align-items-center">
						<span className={`icon ${item.icon}`} />
						<div className="ml15">
							<h6 className="mb-0">{item.label}</h6>
							<p className="text mb-0 fz15">{item.value}</p>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default OverView

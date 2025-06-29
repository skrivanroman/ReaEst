import React from 'react'

const professionalInfoData = [
	{ label: 'Email', content: null },
	{ label: 'Adresa', content: 'House on the Northridge' },
	{ label: 'Kancelář', content: '+848 032 03 01' },
	{ label: 'Mobil', content: '+420 774 143 142' },
	{ label: 'Stránky', content: 'www.reaest.com' },
	{ label: 'Členem od', content: '1-12-2024' },
]

const ProfessionalInfo = ({ email }) => {
	professionalInfoData[0].content = email
	return (
		<div className="widget-wrapper mb-0">
			<h6 className="title fz17 mb35">Informace</h6>
			{professionalInfoData.map((info, index) => (
				<div key={index} className="list-news-style d-flex align-items-center justify-content-between mb10">
					<div className="flex-shrink-0">
						<h6 className="fz14 mb-0">{info.label}</h6>
					</div>
					<div className="news-content flex-shrink-1 ms-3 text-end">
						<p className="text mb-0 fz14">{info.content}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProfessionalInfo

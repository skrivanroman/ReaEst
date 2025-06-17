'use client'

import React, { useEffect, useState } from 'react'
import ListingItems from '../ListingItems'
import listings from '@/data/listings'
import Link from 'next/link'

export default function ListingItemsContainer({ userId, propertyCount }) {
	const [properties, setProperties] = useState([])
	const [currentPayType, setCurrentPayType] = useState('')
	const [pageData, setPageData] = useState([])
	useEffect(() => {
		const fetchProperties = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/property/?userId=${userId}`)
			const data = await response.json()
			console.log(data.properties)
			setProperties(data.properties)
			setCurrentPayType('all')
		}
		fetchProperties()
	}, [])

	useEffect(() => {
		switch (currentPayType) {
			case 'all':
				setPageData(properties?.slice(0, 4))
				break
			case 'rent':
				setPageData(properties?.filter((elm) => elm.payType === 'rent').slice(0, 4))
				break
			case 'buy':
				setPageData(properties?.filter((elm) => elm.payType === 'buy').slice(0, 4))
				break
			default:
				break
		}
	}, [currentPayType])

	return (
		<div className="row align-items-center mt20">
			<div className="col-sm-4">
				<h6 className="fz17">{propertyCount} Nemovitostí</h6>
			</div>
			{/* End .col-4 */}

			<div className="col-sm-8">
				<div className="dark-light-navtab style4 mt-0 mt-lg-4 mb30">
					<ul className="nav nav-pills justify-content-start justify-content-sm-end" id="pills-tab" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className={currentPayType === 'all' ? 'nav-link active' : 'nav-link'}
								onClick={() => setCurrentPayType('all')}
							>
								Všechny
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={currentPayType === 'rent' ? 'nav-link active' : 'nav-link'}
								onClick={() => setCurrentPayType('rent')}
							>
								Na pronájem
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={currentPayType == 'buy' ? 'nav-link me-0 active' : 'nav-link me-0'}
								onClick={() => setCurrentPayType('buy')}
							>
								Na koupi
							</button>
						</li>
					</ul>
				</div>
			</div>
			{/* End .col-8 */}

			<div className="col-lg-12">
				<div className="tab-content" id="pills-tabContent">
					<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
						<div className="row">
							<ListingItems data={pageData} />
						</div>
					</div>
					{/* End tab-pane */}

					{/* End tab-pane */}
				</div>
				{/* End tab-content */}

				<div className="d-grid pb30 bdrb1">
					<Link href="/single-v1/4" className="ud-btn btn-white2">
						Ukázat všechny
						<i className="fal fa-arrow-right-long" />
					</Link>
				</div>
			</div>
		</div>
	)
}

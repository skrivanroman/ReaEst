'use client'
import DefaultHeader from '@/components/common/DefaultHeader'

import Footer from '@/components/common/default-footer'
import MobileMenu from '@/components/common/mobile-menu'

import ProperteyFiltering from '@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
/*
export const metadata = {
  title: "Gird Full 3 Column || Homez - Real Estate NextJS Template",
};
*/

const translate = {
	house: 'Domy',
	flat: 'Byty',
	office: 'Kanceláře',
	cottage: 'Chalupy',
	land: 'Pozemky',
	project: 'Projekty',
	other: 'Ostatní',
}

const GridFull3ColInner = () => {
	const searchParams = useSearchParams()
	const [filters, setFilters] = useState({
		category: searchParams.get('category') || 'all',
		city: searchParams.get('city') || 'all',
	})
	const [properties, setProperties] = useState([])

	useEffect(() => {
		const fetchProperties = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/property/?category=${filters.category}`)
			const data = await response.json()
			console.log(data.properties)
			setProperties(data.properties)
		}
		fetchProperties()
	}, [filters])

	return (
		<>
			{/* Main Header Nav */}
			<DefaultHeader />
			{/* End Main Header Nav */}

			{/* Mobile Nav  */}
			<MobileMenu />
			{/* End Mobile Nav  */}

			{/* Breadcumb Sections */}
			<section className="breadcumb-section bgc-f7">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcumb-style1">
								<h2 className="title">{translate[filters.category]}</h2>
								<div className="breadcumb-list">
									<a href="#">{translate[filters.category]}</a>
									<a href="#">Všechny</a>
								</div>
								<a
									className="filter-btn-left mobile-filter-btn d-block d-lg-none"
									data-bs-toggle="offcanvas"
									href="#listingSidebarFilter"
									role="button"
									aria-controls="listingSidebarFilter"
								>
									<span className="flaticon-settings" /> Filter
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End Breadcumb Sections */}

			{/* Property Filtering */}
			<ProperteyFiltering properties={properties} />
			{/* Property Filtering */}

			{/* Start Our Footer */}
			<section className="footer-style1 pt60 pb-0">
				<Footer />
			</section>
			{/* End Our Footer */}
		</>
	)
}

const GridFull3Col = () => {
	return (
		<Suspense>
			<GridFull3ColInner />
		</Suspense>
	)
}

export default GridFull3Col

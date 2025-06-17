'use client'
import React from 'react'
import Select from 'react-select'

const options = {
	countries: ['Česká republika', 'Rakousko', 'Chorvatsko'],
	regions: [
		'Praha',
		'Středočeský kraj',
		'Jihočeský kraj',
		'Plzeňský kraj',
		'Karlovarský kraj',
		'Ústecký kraj',
		'Liberecký kraj',
		'Královéhradecký kraj',
		'Pardubický kraj',
		'Kraj Vysočina',
		'Jihomoravský kraj',
		'Olomoucký kraj',
		'Moravskoslezský kraj',
		'Zlínský kraj',
	],
}

const customStyles = {
	option: (styles, { isFocused, isSelected, isHovered }) => {
		return {
			...styles,
			backgroundColor: isSelected ? '#eb6753' : isHovered ? '#eb675312' : isFocused ? '#eb675312' : undefined,
		}
	},
}

const SelectMultiField = ({ updateSelect }) => {
	const fieldTitles = ['Země', 'Kraj']
	const selectNames = ['country', 'region']
	return (
		<>
			{Object.keys(options).map((key, index) => (
				<div className="col-sm-6 col-xl-4" key={index}>
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">{fieldTitles[index]}</label>
						<div className="location-area">
							<Select
								styles={customStyles}
								name={selectNames[index]}
								className="select-custom pl-0"
								classNamePrefix="select"
								required
								onChange={updateSelect}
								options={options[key].map((item) => ({
									value: item,
									label: item,
								}))}
							/>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default SelectMultiField

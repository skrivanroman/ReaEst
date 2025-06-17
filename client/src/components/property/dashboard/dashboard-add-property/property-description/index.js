'use client'
import Select from 'react-select'
import { useState } from 'react'

const PropertyDescription = ({ updateForm, updateSelect }) => {
	const catergoryOptions = [
		{ value: 'house', label: 'Dům' },
		{ value: 'flat', label: 'Byt' },
		{ value: 'office', label: 'Kancelář' },
		{ value: 'cottage', label: 'Chalupa' },
		{ value: 'land', label: 'Pozemek' },
		{ value: 'projekt', label: 'projekt' },
		{ value: 'other', label: 'ostatní' },
	]
	const listedIn = [
		{ value: 'rent', label: 'pronájem' },
		{ value: 'buy', label: 'prodat' },
	]
	const PropertyStatus = [
		{ value: 'All Cities', label: 'All Cities' },
		{ value: 'Pending', label: 'Pending' },
		{ value: 'Processing', label: 'Processing' },
		{ value: 'Published', label: 'Published' },
	]

	const customStyles = {
		option: (styles, { isFocused, isSelected, isHovered }) => {
			return {
				...styles,
				backgroundColor: isSelected ? '#eb6753' : isHovered ? '#eb675312' : isFocused ? '#eb675312' : undefined,
			}
		},
	}

	return (
		<form className="form-style1">
			<div className="row">
				<div className="col-sm-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Jméno</label>
						<input type="text" name="title" className="form-control" placeholder="Jméno" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-12 */}

				<div className="col-sm-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Popis</label>
						<textarea cols={30} rows={5} name="description" defaultValue={''} onChange={updateForm} />
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Vybrat kategorii</label>
						<div className="location-area">
							<Select
								defaultValue={[catergoryOptions[1]]}
								name="category"
								options={catergoryOptions}
								styles={customStyles}
								className="select-custom pl-0"
								classNamePrefix="select"
								onChange={updateSelect}
								required
							/>
						</div>
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Typ</label>
						<div className="location-area">
							<Select
								defaultValue={[listedIn[1]]}
								name="payType"
								options={listedIn}
								styles={customStyles}
								className="select-custom pl-0"
								classNamePrefix="select"
								onChange={updateSelect}
								required
							/>
						</div>
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Status</label>
						<div className="location-area">
							<Select
								defaultValue={[PropertyStatus[1]]}
								name="status"
								options={PropertyStatus}
								styles={customStyles}
								className="select-custom pl-0"
								classNamePrefix="select"
								onChange={updateSelect}
								required
							/>
						</div>
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb30">
						<label className="heading-color ff-heading fw600 mb10">Cena v Kč</label>
						<input type="text" name="price" className="form-control" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb30">
						<label className="heading-color ff-heading fw600 mb10">Roční daň</label>
						<input type="text" name="yearlyTax" className="form-control" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-6 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb30">
						<label className="heading-color ff-heading fw600 mb10">Dodatek k ceně</label>
						<input type="text" name="afterPrice" className="form-control" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-6 */}
			</div>
		</form>
	)
}

export default PropertyDescription

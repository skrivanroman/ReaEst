import React from 'react'
import MultiSelectField from './MultiSelectField'
import StructureType from './StructureType'

const DetailsFiled = ({ updateForm }) => {
	return (
		<form className="form-style1">
			<div className="row">
				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">
							Plocha v m<sup>2</sup>
						</label>
						<input name="size" type="text" className="form-control" placeholder="Your Name" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Lot size in ft (only numbers)</label>
						<input type="text" className="form-control" placeholder="Your Name" />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Počet pokojů</label>
						<input
							type="text"
							name="roomCount"
							className="form-control"
							placeholder="Your Name"
							onChange={updateForm}
						/>
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Počet místností</label>
						<input
							type="text"
							name="bedroomCount"
							className="form-control"
							placeholder="Your Name"
							onChange={updateForm}
						/>
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Počet Koupelen</label>
						<input
							type="text"
							name="bathroomCount"
							className="form-control"
							placeholder="Your Name"
							onChange={updateForm}
						/>
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Vlastní ID</label>
						<input type="text" name="customId" className="form-control" placeholder="Your Name" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Počet garáží</label>
						<input
							type="text"
							name="garageCount"
							className="form-control"
							placeholder="Your Name"
							onChange={updateForm}
						/>
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Garage size</label>
						<input type="text" className="form-control" placeholder="Your Name" />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Doba výstavby</label>
						<input type="date" name="yearBuilt" className="form-control" onChange={updateForm} />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Dostupné od</label>
						<input
							type="date"
							name="availableFrom"
							className="form-control"
							placeholder="99.aa.yyyy"
							onChange={updateForm}
						/>
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Basement</label>
						<input type="text" className="form-control" placeholder="Your Name" />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Extra details</label>
						<input type="text" className="form-control" placeholder="Your Name" />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Roofing</label>
						<input type="text" className="form-control" placeholder="Your Name" />
					</div>
				</div>
				{/* End .col-4 */}

				<div className="col-sm-6 col-xl-4">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Exterior Material</label>
						<input type="text" className="form-control" placeholder="Your Name" />
					</div>
				</div>
				{/* End .col-4 */}

				<StructureType />
			</div>
			{/* End .row */}

			<div className="row">
				<MultiSelectField />

				<div className="col-sm-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Owner/ Agent nots (not visible on front end)</label>
						<textarea cols={30} rows={5} placeholder="There are many variations of passages." defaultValue={''} />
					</div>
				</div>
				{/* End .col-12 */}
			</div>
		</form>
	)
}

export default DetailsFiled

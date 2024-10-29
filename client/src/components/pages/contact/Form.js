import React from 'react'

const Form = () => {
	return (
		<form className="form-style1">
			<div className="row">
				<div className="col-lg-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Křestní jméno</label>
						<input type="text" className="form-control" placeholder="Jan" required />
					</div>
				</div>
				{/* End .col-lg-12 */}

				<div className="col-lg-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Příjmení</label>
						<input type="text" className="form-control" placeholder="Nový" required />
					</div>
				</div>
				{/* End .col-lg-12 */}
				<div className="col-lg-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Telefoní číslo</label>
						<input type="text" className="form-control" placeholder="777 000 111" required />
					</div>
				</div>

				<div className="col-md-12">
					<div className="mb20">
						<label className="heading-color ff-heading fw600 mb10">Email</label>
						<input type="email" className="form-control" placeholder="novy@seznam.cz" required />
					</div>
				</div>
				{/* End .col-lg-12 */}

				<div className="col-md-12">
					<div className="mb10">
						<label className="heading-color ff-heading fw600 mb10">Zpráva</label>
						<textarea
							cols={30}
							rows={4}
							placeholder="Dobrý den, chtěl bych se informovat..."
							defaultValue={''}
							required
						/>
					</div>
				</div>
				{/* End .col-lg-12 */}

				<div className="col-md-12">
					<div className="d-grid">
						<button type="submit" className="ud-btn btn-thm">
							Odeslat
							<i className="fal fa-arrow-right-long" />
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Form

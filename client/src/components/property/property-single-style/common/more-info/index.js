'use client'
import Select from 'react-select'
import SingleAgentInfo from './SingleAgentInfo'

const InfoWithForm = ({ data }) => {
	const inqueryType = [
		{ value: 'Engineer', label: 'Inženýr' },
		{ value: 'Doctor', label: 'Doktor' },
		{ value: 'Employee', label: 'Zaměstnanec' },
		{ value: 'Businessman', label: 'Podnikatel' },
		{ value: 'Other', label: 'Jiné' },
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
		<>
			<SingleAgentInfo data={data} />

			<div className="row">
				<div className="col-md-12">
					<form className="form-style1 row">
						<div className="col-md-6">
							<div className="mb20">
								<label className="heading-color ff-heading fw600 mb10">Jméno</label>
								<input type="text" className="form-control" placeholder="Jan Novák" />
							</div>
						</div>
						{/* End .col */}

						<div className="col-md-6">
							<div className="mb20">
								<label className="heading-color ff-heading fw600 mb10">Telefon</label>
								<input type="text" className="form-control" placeholder="777 000 111" />
							</div>
						</div>
						{/* End .col */}

						<div className="col-md-6">
							<div className="mb20">
								<label className="heading-color ff-heading fw600 mb10">Email</label>
								<input type="email" className="form-control" placeholder="novak@seznam.cz" />
							</div>
						</div>
						{/* End .col */}

						<div className="col-md-6">
							<div className="widget-wrapper sideborder-dropdown">
								<label className="heading-color ff-heading fw600 mb10">Jsem</label>
								<div className="form-style2 input-group">
									<Select
										defaultValue={inqueryType[0]}
										name="colors"
										options={inqueryType}
										styles={customStyles}
										className="custom-react_select"
										classNamePrefix="select"
										required
										isClearable={false}
									/>
								</div>
							</div>
						</div>
						{/* End .col */}

						<div className="col-md-12">
							<div className="mb10">
								<label className="heading-color ff-heading fw600 mb10">Zpráva</label>
								<textarea cols={30} rows={4} defaultValue={''} />
							</div>
						</div>
						{/* End .col */}

						<div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
							<label className="custom_checkbox fz14 ff-heading">
								Souhlasím s podmíkamy odeslání
								<input type="checkbox" />
								<span className="checkmark" />
							</label>
						</div>
						{/* End .col */}

						<div className="btn-area mt20">
							<button className="ud-btn btn-white2">
								Kontaktovat <i className="fal fa-arrow-right-long" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default InfoWithForm

'use client'
import Select from 'react-select'

const SelectDropdown = () => {
	const catOptions = [
		{ value: 'Apartments', label: 'Byty' },
		{ value: 'Bungalow', label: 'Bungalow' },
		{ value: 'Houses', label: 'Domy' },
		{ value: 'Loft', label: 'Loft' },
		{ value: 'Office', label: 'Kanceláře' },
		{ value: 'Townhome', label: 'Townhome' },
		{ value: 'Villa', label: 'Villa' },
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
			<Select
				defaultValue={[catOptions[0]]}
				name="colors"
				options={catOptions}
				styles={customStyles}
				className="text-start select-borderless"
				classNamePrefix="select"
				required
				isSearchable={false}
			/>
		</>
	)
}

export default SelectDropdown

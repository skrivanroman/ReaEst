'use client'
import Select from 'react-select'

const SelectDropdown = () => {
	const catOptions = [
		{ value: 'house', label: 'Domy' },
		{ value: 'flat', label: 'Byty' },
		{ value: 'office', label: 'Kanceláře' },
		{ value: 'cottage', label: 'Chalupy' },
		{ value: 'land', label: 'Pozemky' },
		{ value: 'projekt', label: 'Projekty' },
		{ value: 'other', label: 'Ostatní' },
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

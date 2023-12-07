export const customStyles = {
	option: (defaultStyles, state) => ({
		...defaultStyles,
		color: state.isSelected ? "#fff" : "#fff",
		backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
		":hover": {
			backgroundColor: "#3f3f3f",
			cursor: "pointer",
		},
		borderRadius: "0",
	}),

	control: (defaultStyles) => ({
		...defaultStyles,
		backgroundColor: "#212529",
		padding: "10px",
		border: "none",
		boxShadow: "none",
		minWidth: "200px",
	}),
	singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
	indicatorSeparator: (defaultStyles) => ({
		...defaultStyles,
		display: "none",
	}),
	menu: (defaultStyles) => ({ ...defaultStyles, backgroundColor: "#212529" }),
	menuList: (defaultStyles) => ({
		...defaultStyles,
		padding: "0",
		borderRadius: "10px",
	}),
	input: (defaultStyles) => ({
		...defaultStyles, 
		color: '#fff'
	})
};
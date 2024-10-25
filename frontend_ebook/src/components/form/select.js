const Select = ({list}) => {
	return(<div>
		{list.map((item, i) => {
			return(<div>
				{item}
			</div>)
		})}
	</div>);
}

export default Select;
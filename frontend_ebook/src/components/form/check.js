const Check = ({id, name, cls, label}) => {
	return(
		<div className="check">
			<input type="checkbox" id={id} name={name} className={cls}/>
			<label for={id}>{label}</label>
		</div>
	)
}

export default Check;
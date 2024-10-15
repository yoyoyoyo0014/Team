const Check = ({id, name, cls, label, style}) => {
	return(
		<div className="check" style={style}>
			<input type="checkbox" id={id} name={name} className={cls}/>
			<label for={id}>{label}</label>
		</div>
	)
}

export default Check;
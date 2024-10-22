const Check = ({id, name, cls, label, value, style, change, checked, click}) => {
	return(
		<div className="check" style={style}>
			<input type="checkbox" id={id} name={name} value={value} className={cls} onChange={change} checked={checked}/>
			<label for={id} onClick={click}>{label}</label>
		</div>
	)
}

export default Check;
const Check = ({id, name, cls, label, style, change, checked, click}) => {
	return(
		<div className="check" style={style}>
			<input type="checkbox" id={id} name={name} className={cls} onChange={change} checked={checked}/>
			<label for={id} onClick={click}>{label}</label>
		</div>
	)
}

export default Check;
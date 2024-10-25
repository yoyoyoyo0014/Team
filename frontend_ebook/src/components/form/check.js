<<<<<<< HEAD
const Check = ({id, name, cls, label, style}) => {
	return(
		<div className="check" style={style}>
			<input type="checkbox" id={id} name={name} className={cls}/>
			<label for={id}>{label}</label>
=======
const Check = ({id, name, cls, label, value, style, change, checked, click}) => {
	return(
		<div className="check" style={style}>
			<input type="checkbox" id={id} name={name} value={value} className={cls} onChange={change} checked={checked}/>
			<label for={id} onClick={click}>{label}</label>
>>>>>>> KCL
		</div>
	)
}

export default Check;
function Button({type, text, name, cls}){
	return(
		<button type={type} name={name} className={cls}>{text}</button>
	)
}

export default Button;
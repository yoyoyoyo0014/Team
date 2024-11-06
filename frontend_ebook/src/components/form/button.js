const Button = ({type, text, name, cls, click, disabled, style}) => {
	return(
		<button type={type} name={name} className={cls} onClick={click} disabled={disabled} style={style}>{text}</button>
	)
}

export default Button;
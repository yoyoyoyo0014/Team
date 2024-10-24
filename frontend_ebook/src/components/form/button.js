const Button = ({type, text, name, cls, click, disabled}) => {
	return(
		<button type={type} name={name} className={cls} onClick={click} disabled={disabled}>{text}</button>
	)
}

export default Button;
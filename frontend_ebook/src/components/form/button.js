const Button = ({type, text, name, cls, click}) => {
	return(
		<button
			type={type}
			name={name}
			className={cls}
			onClick={click}>{text}</button>
	)
}

export default Button;
const Button = ({type, text, name, cls, onClick}) => {
	return(
		<button type={type} name={name} className={cls} onClick={onClick}>{text}</button>
	)
}

export default Button;
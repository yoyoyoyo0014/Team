<<<<<<< HEAD
const Button = ({type, text, name, cls, click}) => {
	return(
		<button
			type={type}
			name={name}
			className={cls}
			onClick={click}>{text}</button>
=======
const Button = ({type, text, name, cls, click, disabled}) => {
	return(
		<button type={type} name={name} className={cls} onClick={click} disabled={disabled}>{text}</button>
>>>>>>> KCL
	)
}

export default Button;
const Input = ({id, type, placeholder, name, cls, change, value, readOnly}) => {
	return(
		<input
			type={type}
			placeholder={placeholder}
			id={id}
			name={name}
			className={cls}
			onChange={e => change(e.target.value)}
			value={value}
			readOnly={
				readOnly ? 'readonly' : ''
			}/>
	)
}
//, notice, cls
const InputItem = ({input, label, notice, cls}) => {
	return(
		<div className={"input-item " + (cls && cls !== '' ? cls : '')}>
			<Input
				type={input.type}
				placeholder={input.placeholder}
				id={input.id}
				name={input.name}
				className={input.cls}
				change={input.change}
				value={input.value}/>
			{label && label !== "" ? <label>{label} {notice && notice ? <span>{notice}</span> : ''}</label> : ""}
		</div>
	)
}

export {Input, InputItem};
const Input = ({id, type, placeholder, name, cls}) => {
	return(
		<input type={type} placeholder={placeholder} id={id} name={name} className={cls}/>
	)
}

const InputItem = ({inputs, label, notice, cls}) => {
	return(
		<div className={"input-item"}>
			{
				inputs && inputs.map(input => {
					return <Input type={input.type} placeholder={input.placeholder} id={input.id} name={input.name} className={input.cls} />
				})
			}
			{label && label !== "" ? <label>{label} {notice && notice ? <span>{notice}</span> : ''}</label> : ""}
		</div>
	)
}

export {Input, InputItem};
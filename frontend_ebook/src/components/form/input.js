import { useState } from "react"

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

const InputItem = ({id, type, placeholder, name, cls, change, value, readOnly, label, notice, registerProps, error, style}) => {

	return(
		<div className="input-item" style={style}>
			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				className={cls}
				value={value} // 값 설정
				onChange={(e)=>change(e.target.value)} // onChange 설정
				{...registerProps} // register 함수의 속성을 전달
				readOnly={
					readOnly ? 'readonly' : ''
				}/>
			{label && label !== "" ? <label>{label} {notice && notice ? <span>{notice}</span> : ''}</label> : ""}
			{error && <span className="error">{error.message}</span>} {/* 에러 메시지 */}
		</div>
	)
}

export {Input, InputItem};
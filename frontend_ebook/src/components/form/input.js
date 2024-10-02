const Input = ({id, type, placeholder, name, cls}) => {
	return(
		<input type={type} placeholder={placeholder} id={id} name={name} className={cls}/>
	)
}

const InputItem = ({ inputs, label, notice }) => {
  return (
    <div>
      <label>{label}</label>
      {inputs.map((input, index) => (
        <div key={input.id || index}> {/* key prop 추가 */}
          <input
            id={input.id}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            className={input.cls}
						value={input.value} // 값 설정
            onChange={input.onChange} // onChange 설정
            {...input.registerProps} // register 함수의 속성을 전달
          />
         {input.error && <p className="error-message">{input.error.message}</p>} {/* 에러 메시지 */}
        </div>
      ))}
      {notice && <p className="notice">{notice}</p>} {/* 알림 메시지 */}
    </div>
  );
};

export {Input, InputItem};
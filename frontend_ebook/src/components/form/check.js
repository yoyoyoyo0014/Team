const Check = ({ id, name, cls, label, value, style, checked, change, click }) => {
  return (
    <div className="check" style={style}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value} // value 속성 추가
        className={cls}
        checked={checked} // checked 속성 추가
        onChange={change} // onChange 핸들러 추가
      />
      <label htmlFor={id} onClick={click}>{label}</label> {/* 클릭 핸들러 추가 */}
    </div>
  );
};


export default Check;
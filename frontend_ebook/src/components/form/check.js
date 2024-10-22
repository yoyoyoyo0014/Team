const Check = ({ id, name, cls, label, style, checked, change }) => {
  return (
    <div className="check" style={style}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={cls}
        checked={checked}
        onChange={change}  // onChange 이벤트 핸들러 추가
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Check;
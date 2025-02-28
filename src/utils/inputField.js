export const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    mask,
  }) => (
    <div>
      <h3 className="basket__user-data__title">{label}</h3>
      <input
        className="basket__user-data__input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        mask={mask}
      />
    </div>
  );
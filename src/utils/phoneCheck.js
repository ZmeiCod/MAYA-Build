export const phoneNumberChange = (e, setPhone) => {
  const rawValue = e.target.value;
  const cleaned = rawValue.replace(/\D/g, "");

  if (cleaned.length <= 11) {
    setPhone(formatPhoneNumber(cleaned));
  }
};

export const formatPhoneNumber = (value) => {
  const length = value.length;

  if (length === 0) return "";

  if (length <= 4) return "+7 (" + value.slice(1);
  if (length <= 7) return "+7 (" + value.slice(1, 4) + ") " + value.slice(4);
  if (length <= 9)
    return (
      "+7 (" +
      value.slice(1, 4) +
      ") " +
      value.slice(4, 7) +
      "-" +
      value.slice(7)
    );
  return (
    "+7 (" +
    value.slice(1, 4) +
    ") " +
    value.slice(4, 7) +
    "-" +
    value.slice(7, 9) +
    "-" +
    value.slice(9)
  );
};

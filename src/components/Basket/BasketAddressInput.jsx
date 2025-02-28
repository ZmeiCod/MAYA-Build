import React, { useState } from "react";
import { AddressSuggestions } from "react-dadata";

export const AddressInput = ({ value = "", onChange }) => {
  const dadata = process.env.REACT_APP_API_DADATA;
  const [isFocused, setIsFocused] = useState(false);

  const handleAddressChange = (address) => {
    const addressString = address ? address.value : "";
    onChange(addressString);
  };

  return (
    <div>
      <h3 className="basket__user-data__title">Адрес</h3>
      <AddressSuggestions
        token={dadata}
        value={value}
        onChange={handleAddressChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

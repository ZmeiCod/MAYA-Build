import React, { useState } from "react";
import { AddressSuggestions } from "react-dadata";

export const AddressInput = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleAddressChange = (address) => {
    const addressString = address ? address.value : "";
    onChange(addressString);
    console.log(addressString)
  };



  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <AddressSuggestions
        token="f7ad2a5b36af819389f6438f578deb5b64cd6019"
        value={value}
        onChange={handleAddressChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label 
        style={{
          position: 'absolute',
          left: '10px',
          top: isFocused || value ? '5px' : '12px', // позиция текста
          fontSize: isFocused || value ? '12px' : '13px', // уменьшение размера текста
          color: isFocused || value ? 'rgba(0, 124, 214, .7)' : '#828282', // цвет текста
        }}
      >
        {value ? null : 'Введите адрес доставки'}
      </label>
    </div>
  );
};

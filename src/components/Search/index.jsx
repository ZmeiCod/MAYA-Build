import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { Context } from "../../App";

import search from '../../assets/ui/search.svg'
import searchClear from '../../assets/ui/searchClear.svg'

const Search = () => {
  const [value, setValue] = React.useState("");
  const { searchValue, setSearchValue } = React.useContext(Context);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
 //
  return (
    <div className={styles.root}>
      <img src={search} alt="search"  className={styles.icon}/>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Найти любимое блюдо..."
      />
      {value && (
        <img onClick={onClickClear}
        className={styles.clearIcon} src={searchClear} alt="searchClear" />
      )}
    </div>
  );
};

export default Search;

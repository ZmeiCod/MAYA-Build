import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchValue: "",
  categoryId: 0,
  sorting: {
    id: '1',
    name: "популярное",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSorting(state, action) {
      state.sorting = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sorting.name = action.payload.sorting  // Используем значение по умолчанию
      }
    },
  },
);

export const { setCategoryId, setSorting, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;

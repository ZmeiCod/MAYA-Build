import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // Добавляем size в объект поиска
      const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size);
    
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action) {
      // Используем как id, так и size для фильтрации
      state.items = state.items.filter((obj) => obj.id !== action.payload.id || obj.size !== action.payload.size);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    
    minusItem(state, action) {
      // Найдем товар по id и size
      const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size);
    
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          // Если количество 1, то удаляем товар
          state.items = state.items.filter((obj) => obj.id !== action.payload.id || obj.size !== action.payload.size);
        }
      }
    
      // Обновляем общую стоимость после изменения количества товара
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

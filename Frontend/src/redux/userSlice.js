import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopsInMyCity: null,
    itemsInMyCity: null,
    cartItems: [],
    totalamount: 0,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    Addtocart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        if (!existingItem.shop && newItem.shop) {
          existingItem.shop = newItem.shop;
        }
      } else {
        state.cartItems.push({ ...newItem });
      }
      state.totalamount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      console.log(
        "🛒 Updated cart:",
        JSON.parse(JSON.stringify(state.cartItems)),
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cartItems.find((i) => i.id === id);

      if (item) {
        item.quantity = quantity;
      }
      state.totalamount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalamount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemsInMyCity,
  Addtocart,
  updateQuantity,
  removeItem,
  totalamount,
} = userSlice.actions;
export default userSlice.reducer;

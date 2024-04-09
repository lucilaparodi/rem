import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, actions) => {
      const index = state.items.findIndex(
        (item) => item.id === actions.payload.id
      );

      if (index === -1) {
        state.items = [...state.items, { ...actions.payload, quantity: 1 }];
        state.total = state.items.reduce(
          (acc, item) => (acc = acc + item.price),
          0
        );
      } else {
        state.items = state.items.map((item) => {
          if (item.id === actions.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      state.total = state.items.reduce(
        (acc, item) => (acc = acc + item.price * item.quantity),
        0
      );
    },
    deleteCartItem: (state, actions) => {
      state.items = state.items.filter((item) => item.id !== actions.payload);
      state.total = state.items.reduce(
        (acc, item) => (acc = acc + item.price * item.quantity),
        0
      );
    },
    deleteCart: (state) => {
      state.total = 0;
      state.items = [];
    },
  },
});

export const { addCartItem, deleteCartItem, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;

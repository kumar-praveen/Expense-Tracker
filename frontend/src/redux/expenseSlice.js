import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    category: "",
    expenses: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    resetExpenseState: (state, action) => {
      state.expenses = [];
    },
  },
});

export const { setCategory, setExpenses, resetExpenseState } =
  expenseSlice.actions;
export default expenseSlice.reducer;

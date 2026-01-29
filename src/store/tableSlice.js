import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: 1, name: "Ashish", email: "ashish@gmail.com", phone: "9876543210", city: "Mumbai" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", phone: "9123456780", city: "Delhi" },
    { id: 3, name: "Neha", email: "neha@gmail.com", phone: "9988776655", city: "Pune" },
    { id: 4, name: "Priya", email: "priya@gmail.com", phone: "8899776655", city: "Bangalore" },
    { id: 5, name: "Amit", email: "amit@gmail.com", phone: "7788996655", city: "Chennai" },
  ],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addRow } = tableSlice.actions;
export default tableSlice.reducer;

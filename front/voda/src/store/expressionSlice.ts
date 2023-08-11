import { createSlice } from "@reduxjs/toolkit";

const expressionSlice = createSlice({
    name: 'expressionSlice',
    initialState: {
      expression: '',
    },
    reducers: {
        expressionSliceUpdate: (state, action) => {
          state.expression = action.payload.expressionData;
        }
    }
});

export default expressionSlice;
export const {expressionSliceUpdate} = expressionSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const expressionSlice = createSlice({
    name: 'expressionSlice',
    initialState: {
      expression: '',
    },
    reducers: {
        updateExpressionData: (state, action) => {
          state.expression = action.payload;
        }
    }
});

export default expressionSlice;
export const {updateExpressionData} = expressionSlice.actions;
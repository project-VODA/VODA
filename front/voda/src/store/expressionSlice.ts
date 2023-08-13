import { createSlice } from "@reduxjs/toolkit";

const expressionSlice = createSlice({
    name: 'expressionSlice',
    initialState: {
      expressionData : {
        expression: '',
        probability:0,
      }
    },
    reducers: {
        updateExpressionData: (state, action) => {
          state.expressionData.expression = action.payload.expression;
          state.expressionData.probability = action.payload.probability;
        }
    }
});

export default expressionSlice;
export const {updateExpressionData} = expressionSlice.actions;
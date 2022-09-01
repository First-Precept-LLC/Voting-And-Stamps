import { createSlice } from '@reduxjs/toolkit'

export type Values = {
  title: string
  icon: string
  description: string
  orgId: string
  userId: string
}

const initialState = {
  getValuesRequest: false,
  values: [],
  saveValuesRequest: false,
   isSaveValuesSuccess: false,
   isSaveValuesFailure: false
}

export const valuesSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    getValuesRequest: (state) => {
      state.getValuesRequest = true;
    },
     getValuesSuccess: (state, action) => {
      state.getValuesRequest = false;
      state.values = action.payload
    },
    getValuesFailure: (state, action) => {
      state.getValuesRequest = false;
      state.values = [];
    },
     saveValuesRequest: (state, action) => {
      state.saveValuesRequest = true;
    },
    saveValuesSuccess: (state, action) => {
      const copyValues = [...state.values, action.payload] as any;
      state.saveValuesRequest = true;
      state.isSaveValuesSuccess = true;
      state.isSaveValuesFailure = false;
      localStorage.setItem("values", JSON.stringify(copyValues));
      state.values = copyValues;
    },
    saveValuesFailure: (state) => {
      state.saveValuesRequest = true;
      state.isSaveValuesSuccess = false;
      state.isSaveValuesFailure = true;
    },
    resetStatus: (state, action) => {
      state.isSaveValuesSuccess = false;
      state.isSaveValuesFailure = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const valuesActions = valuesSlice.actions

export default valuesSlice.reducer
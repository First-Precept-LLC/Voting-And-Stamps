import { createSlice } from '@reduxjs/toolkit'

export type Values = {
  title: string
  icon: string
  description: string
  orgId: string
  userId: string
  votes: number
  iconFileName: string
}

const initialState = {
  getValuesRequest: false,
  values: [],
  saveValuesRequest: false,
   isSaveValuesSuccess: false,
   isSaveValuesFailure: false,
   editValuesRequest: false,
   isEditValuesSuccess: false,
   isEditValuesFailure: false
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
    editValuesRequest: (state, action) => {
      state.editValuesRequest = true;
    },
    editValuesSuccess: (state, action) => {
      const localValues = localStorage.getItem("values");
      const copyValues = localValues ? JSON.parse(localValues) : [];
      const findUserIndex = copyValues.findIndex((value) => value.id === action.payload?.id);
      if (findUserIndex !== -1) {
        copyValues[findUserIndex] = action.payload;
      }
      state.editValuesRequest = true;
      state.isEditValuesSuccess = true;
      state.isEditValuesFailure = false;
      localStorage.setItem("values", JSON.stringify(copyValues));
      state.values = copyValues;
    },
    editValuesFailure: (state) => {
      state.editValuesRequest = true;
      state.isEditValuesSuccess = false;
      state.isEditValuesFailure = true;
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
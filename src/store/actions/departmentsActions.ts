import { createSlice } from '@reduxjs/toolkit'

export type Departments = {
  title: string
  orgId: string
  userId: string
  id: string
}

const initialState = {
  getDepartmentsRequest: false,
  departments: [],
  saveDepartmentsRequest: false,
  isSaveDepartmentsSuccess: false,
  isSaveDepartmentsFailure: false,

  getDepartmentByIdRequest: false,
  departmentById: {},
}

export const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    getDepartmentsRequest: (state) => {
      state.getDepartmentsRequest = true;
    },
     getDepartmentsSuccess: (state, action) => {
      state.getDepartmentsRequest = false;
      state.departments = action.payload
    },
    getDepartmentsFailure: (state, action) => {
      state.getDepartmentsRequest = false;
      state.departments = [];
    },
     saveDepartmentsRequest: (state, action) => {
      state.saveDepartmentsRequest = true;
    },
    saveDepartmentsSuccess: (state, action) => {
      const localDepartments = localStorage.getItem("departments");
      const copyDepartments = localDepartments ? JSON.parse(localDepartments) : state.departments;
      const copyState = [...copyDepartments, action.payload] as any;

      state.saveDepartmentsRequest = true;
      state.isSaveDepartmentsSuccess = true;
      state.isSaveDepartmentsFailure = false;
      localStorage.setItem("departments", JSON.stringify(copyState));
      state.departments = copyState;
    },
    saveDepartmentsFailure: (state) => {
      state.saveDepartmentsRequest = true;
      state.isSaveDepartmentsSuccess = false;
      state.isSaveDepartmentsFailure = true;
    },
    resetStatus: (state, action) => {
      state.isSaveDepartmentsSuccess = false;
      state.isSaveDepartmentsFailure = false;
    },
    getDepartmentByIdRequest: (state, action) => {
      state.getDepartmentByIdRequest = true;
    },
    getDepartmentByIdSuccess: (state, action) => {
      state.getDepartmentByIdRequest = false;
      state.departmentById = action.payload;
    },
    getDepartmentByIdFailure: (state, action) => {
      state.getDepartmentByIdRequest = false;
      state.departmentById = {};
    }
  },
})

// Action creators are generated for each case reducer function
export const departmentsActions = departmentsSlice.actions

export default departmentsSlice.reducer
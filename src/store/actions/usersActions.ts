import { createSlice } from '@reduxjs/toolkit'

export type Users = {
  name: string
  roleId: string
  levelUp: string
  departmentId: string
  id: string
  orgId: string
}

const initialState = {
  getUsersRequest: false,
  users: [],
  saveUsersRequest: false,
  isSaveUsersSuccess: false,
  isSaveUsersFailure: false,
  editUsersRequest: false
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.getUsersRequest = true;
    },
     getUsersSuccess: (state, action) => {
      state.getUsersRequest = false;
      state.users = action.payload
    },
    getUsersFailure: (state, action) => {
      state.getUsersRequest = false;
      state.users = [];
    },
    saveUsersRequest: (state, action) => {
      state.saveUsersRequest = true;
    },
    saveUsersSuccess: (state, action) => {
      const copyValues = [...state.users, action.payload] as any;
      state.saveUsersRequest = true;
      state.isSaveUsersSuccess = true;
      state.isSaveUsersFailure = false;
      localStorage.setItem("users", JSON.stringify(copyValues));
      state.users = copyValues;
    },
    saveUsersFailure: (state) => {
      state.saveUsersRequest = true;
      state.isSaveUsersSuccess = false;
      state.isSaveUsersFailure = true;
    },
    editUsersRequest: (state, action) => {
      state.editUsersRequest = true;
    },
    editUsersSuccess: (state, action) => {
      const copyValues = [...state.users] as any;
      const findUserIndex = copyValues.findIndex((user) => user.id === action.payload?.id);
      if (findUserIndex !== -1) {
        copyValues[findUserIndex] = action.payload;
      }
      state.editUsersRequest = true;
      state.isSaveUsersSuccess = true;
      state.isSaveUsersFailure = false;
      localStorage.setItem("users", JSON.stringify(copyValues));
      state.users = copyValues;
    },
    editUsersFailure: (state) => {
      state.editUsersRequest = true;
      state.isSaveUsersSuccess = false;
      state.isSaveUsersFailure = true;
    },
    resetStatus: (state, action) => {
      state.isSaveUsersSuccess = false;
      state.isSaveUsersFailure = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const usersActions = usersSlice.actions

export default usersSlice.reducer
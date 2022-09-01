import { createSlice } from '@reduxjs/toolkit'

export type Organizations = {
  orgName: string
  vision: string
  id: string
  userId: string
}

const initialState = {
  getOrganizationRequest: false,
  organizations: null,
  saveOrganizationRequest: false,
  isSaveOrgSuccess: false,
  isSaveOrgFailure: false
}

export const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    getOrganizationRequest: (state) => {
      state.getOrganizationRequest = true;
    },
    getOrganizationsSuccess: (state, action) => {
      state.getOrganizationRequest = false;
      state.organizations = action.payload
    },
    getOrganizationsFailure: (state, action) => {
      state.getOrganizationRequest = false;
      state.organizations = null;
    },
    saveOrganizationsRequest: (state, action) => {
      state.saveOrganizationRequest = true;
    },
    saveOrganizationsSuccess: (state, action) => {
      state.saveOrganizationRequest = true;
      state.isSaveOrgSuccess = true;
      state.isSaveOrgFailure = false;
      localStorage.setItem("organizations", JSON.stringify(action.payload));
      state.organizations = action.payload;
    },
    saveOrganizationsFailure: (state) => {
      state.saveOrganizationRequest = true;
      state.isSaveOrgSuccess = false;
      state.isSaveOrgFailure = true;
    },
    resetStatus: (state, action) => {
      state.isSaveOrgSuccess = false;
      state.isSaveOrgFailure = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const organizationActions = organizationSlice.actions

export default organizationSlice.reducer
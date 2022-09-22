import { createSlice } from '@reduxjs/toolkit'

export type Projects = {
  title: string
  orgId: string
  userId: string
  id: string
}

const initialState = {
  getProjectsRequest: false,
  projects: [],
  saveProjectsRequest: false,
  isSaveProjectsSuccess: false,
  isSaveProjectsFailure: false,

  getProjectByIdRequest: false,
  projectById: {},
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getProjectsRequest: (state) => {
      state.getProjectsRequest = true;
    },
     getProjectsSuccess: (state, action) => {
      state.getProjectsRequest = false;
      state.projects = action.payload
    },
    getProjectsFailure: (state, action) => {
      state.getProjectsRequest = false;
      state.projects = [];
    },
     saveProjectsRequest: (state, action) => {
      state.saveProjectsRequest = true;
    },
    saveProjectsSuccess: (state, action) => {
      const localProjects = localStorage.getItem("projects");
      const copyProjects = localProjects ? JSON.parse(localProjects) : state.projects;
      const copyState = [...copyProjects, action.payload] as any;

      state.saveProjectsRequest = true;
      state.isSaveProjectsSuccess = true;
      state.isSaveProjectsFailure = false;
      localStorage.setItem("projects", JSON.stringify(copyState));
      state.projects = copyState;
    },
    saveProjectsFailure: (state) => {
      state.saveProjectsRequest = true;
      state.isSaveProjectsSuccess = false;
      state.isSaveProjectsFailure = true;
    },
    resetStatus: (state, action) => {
      state.isSaveProjectsSuccess = false;
      state.isSaveProjectsFailure = false;
    },
    getProjectByIdRequest: (state, action) => {
      state.getProjectByIdRequest = true;
    },
    getProjectByIdSuccess: (state, action) => {
      state.getProjectByIdRequest = false;
      state.projectById = action.payload;
    },
    getProjectByIdFailure: (state, action) => {
      state.getProjectByIdRequest = false;
      state.projectById = {};
    }
  },
})

// Action creators are generated for each case reducer function
export const projectsActions = projectsSlice.actions

export default projectsSlice.reducer
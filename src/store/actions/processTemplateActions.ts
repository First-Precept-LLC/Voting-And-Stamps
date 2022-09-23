import { createSlice } from '@reduxjs/toolkit'

type Votes = {
    totalVotes: number
    downVotes: number
    upVotes: number
    valueId: number
    valueName: string
    stepId: number
}

type Steps = {
    name: string
    estimatedDate: any[] | string
    description: string
    votes: {}
    isCompleted: false
}

export type Project = {
    title: string
    orgId: string
    userId: string
    id: string
  }

export type ProcessTemplate = {
  orgId: string
  userId: string
  projectId: string
  projectName: string
  name: string
  estimatedDate: any[] | string
  description: string
  steps: Steps[]
  id: string
  project: Project
}

const initialState = {
  getProcessTemplateRequest: false,
  processTemplates: [],
  saveProcessTemplateRequest: false,
  isSaveProcessTemplateSuccess: false,
  isSaveProcessTemplateFailure: false,

  editProcessTemplateRequest: false,
  isEditProcessTemplateSuccess: false,
  isEditProcessTemplateFailure: false,

  deleteProcessTemplateRequest: false,
  isDeleteProcessTemplateSuccess: false,
  isDeleteProcessTemplateFailure: false,

  getProcessTemplateByProjectId: false,
  projectProcessTemplates: []
}

export const processTemplateSlice = createSlice({
  name: 'processTemplates',
  initialState,
  reducers: {
    getProcessTemplateRequest: (state, action) => {
      state.getProcessTemplateRequest = true;
    },
    getProcessTemplateSuccess: (state, action) => {
      state.getProcessTemplateRequest = false;
      state.processTemplates = action.payload
    },
    getProcessTemplateFailure: (state) => {
      state.getProcessTemplateRequest = false;
      state.processTemplates = [];
    },
    saveProcessTemplateRequest: (state, action) => {
      state.saveProcessTemplateRequest = true;
    },
    saveProcessTemplateSuccess: (state, action) => {
      const copyState = [...state.processTemplates, action.payload] as any;
      state.saveProcessTemplateRequest = false;
      state.isSaveProcessTemplateSuccess = true;
      state.isSaveProcessTemplateFailure = false;
      localStorage.setItem("processTemplates", JSON.stringify(copyState));
      state.processTemplates = copyState;
    },
    saveProcessTemplateFailure: (state) => {
      state.saveProcessTemplateRequest = false;
      state.isSaveProcessTemplateSuccess = false;
      state.isSaveProcessTemplateFailure = true;
    },

    editProcessTemplateRequest: (state, action) => {
        state.editProcessTemplateRequest = true;
      },
    editProcessTemplateSuccess: (state, action) => {
        const copyState = [...state.processTemplates] as any;
        const findTemplateIndex = copyState.findIndex(template => template.id === action.payload?.id);
        if (findTemplateIndex > -1) {
            copyState[findTemplateIndex] = action.payload
        }
        state.editProcessTemplateRequest = false;
        state.isEditProcessTemplateSuccess = true;
        state.isEditProcessTemplateFailure = false;
        localStorage.setItem("processTemplates", JSON.stringify(copyState));
        state.processTemplates = copyState;
      },
    editProcessTemplateFailure: (state) => {
    state.editProcessTemplateRequest = false;
    state.isEditProcessTemplateSuccess = false;
    state.isSaveProcessTemplateFailure = true;
    },

    deleteProcessTemplateRequest: (state, action) => {
        state.deleteProcessTemplateRequest = true;
      },
    deleteProcessTemplateSuccess: (state, action) => {
        let copyState = [...state.processTemplates] as any;
        copyState = copyState.filter(template => template.id !== action.payload);
        state.deleteProcessTemplateRequest = false;
        state.isDeleteProcessTemplateSuccess = true;
        state.isDeleteProcessTemplateFailure = false;
        localStorage.setItem("processTemplates", JSON.stringify(copyState));
        state.processTemplates = copyState;
      },
    deleteProcessTemplateFailure: (state) => {
        state.deleteProcessTemplateRequest = false;
        state.isDeleteProcessTemplateSuccess = false;
        state.isDeleteProcessTemplateFailure = true;
    },
    getProcessTemplateByProjectIdRequest: (state, action) => {
        state.getProcessTemplateByProjectId = true;
    },
    getProcessTemplateByProjectIdSuccess: (state, action) => { 
        state.getProcessTemplateByProjectId = false;
        state.projectProcessTemplates = action.payload ?? [];
    },
    getProcessTemplateByProjectIdFailure: (state) => { 
        state.getProcessTemplateByProjectId = false;
        state.projectProcessTemplates = [];
    },
    resetStatus: (state) => {
      state.isSaveProcessTemplateSuccess = false;
      state.isSaveProcessTemplateFailure = false;
      state.isEditProcessTemplateSuccess = false;
      state.isEditProcessTemplateFailure = false;
      state.isDeleteProcessTemplateSuccess = false;
      state.isDeleteProcessTemplateFailure = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const  processTemplateActions = processTemplateSlice.actions

export default processTemplateSlice.reducer
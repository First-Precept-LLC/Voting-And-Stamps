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

type User = {
    name: string
    roleId: string
    levelUp: string
    departmentId: string
    id: string
    orgId: string
}

export type Project = {
    title: string
    orgId: string
    userId: string
    id: string
  }

export type Process = {
  orgId: string
  userId: Project
  processTemplateId: string
  projectName: string
  name: string
  user: User
  dueDate: string
  steps: Steps[]
  id: string
  processTemplateName: string
  processTemplateDescription: string
  processTemplateProject: Project
}

const initialState = {
  getProcessRequest: false,
  process: [],
  saveProcessRequest: false,
  isSaveProcessSuccess: false,
  isSaveProcessFailure: false,

  editProcessRequest: false,
  isEditProcessSuccess: false,
  isEditProcessFailure: false,

  deleteProcessRequest: false,
  isDeleteProcessSuccess: false,
  isDeleteProcessFailure: false,

  updateStepVotesRequest: false,
  updateStepVotesSuccess: false,
  updateStepVotesFailure: false,

  getProcessByProjectId: false,
  projectProcess: []
}

export const processTemplateSlice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    getProcessRequest: (state, action) => {
      state.getProcessRequest = true;
    },
    getProcessSuccess: (state, action) => {
      state.getProcessRequest = false;
      state.process = action.payload
    },
    getProcessFailure: (state) => {
      state.getProcessRequest = false;
      state.process = [];
    },
    saveProcessRequest: (state, action) => {
      state.saveProcessRequest = true;
    },
    saveProcessSuccess: (state, action) => {
        const localProcess = localStorage.getItem("process");
        const copyProcess = localProcess ? JSON.parse(localProcess) : state.process;
      const copyState = [...copyProcess, action.payload] as any;
      state.saveProcessRequest = false;
      state.isSaveProcessSuccess = true;
      state.isSaveProcessFailure = false;
      localStorage.setItem("process", JSON.stringify(copyState));
      state.process = copyState;
    },
    saveProcessFailure: (state) => {
      state.saveProcessRequest = false;
      state.isSaveProcessSuccess = false;
      state.isSaveProcessFailure = true;
    },

    editProcessRequest: (state, action) => {
        state.editProcessRequest = true;
    },
    editProcessSuccess: (state, action) => {
        const copyState = [...state.process] as any;
        const findTemplateIndex = copyState.findIndex(template => template.id === action.payload?.id);
        if (findTemplateIndex > -1) {
            copyState[findTemplateIndex] = action.payload
        }
        state.editProcessRequest = false;
        state.isEditProcessSuccess = true;
        state.isEditProcessFailure = false;
        localStorage.setItem("process", JSON.stringify(copyState));
        state.process = copyState;
      },
    editProcessFailure: (state) => {
    state.editProcessRequest = false;
    state.isEditProcessSuccess = false;
    state.isSaveProcessFailure = true;
    },

    deleteProcessRequest: (state, action) => {
        state.deleteProcessRequest = true;
    },
    deleteProcessSuccess: (state, action) => {
        const localProcess = localStorage.getItem("process");
        let copyState = localProcess ? JSON.parse(localProcess) : [...state.process];
        copyState = copyState.filter(template => template.id !== action.payload);
        state.deleteProcessRequest = false;
        state.isDeleteProcessSuccess = true;
        state.isDeleteProcessFailure = false;
        localStorage.setItem("process", JSON.stringify(copyState));
        state.process = copyState;
    },
    deleteProcessFailure: (state) => {
        state.deleteProcessRequest = false;
        state.isDeleteProcessSuccess = false;
        state.isDeleteProcessFailure = true;
    },
    updateStepVotesRequest: (state, action) => {
        state.updateStepVotesRequest = true;
        state.updateStepVotesSuccess = false;
        state.updateStepVotesFailure = false;
    },
    updateStepVotesSuccess: (state, action) => {
        const localProcess = localStorage.getItem("process");
        const { payload } = action;
        let copyState = localProcess ? JSON.parse(localProcess) : [...state.process];
        const findTemplateIndex = copyState.findIndex(template => template.id === payload?.processId);
        if (findTemplateIndex > -1) {
            const processData = copyState[findTemplateIndex];
            const processStepIndex = processData?.steps?.findIndex((step) => step.id === payload?.stepId);
            if (processStepIndex > -1) {
                if (payload.eventType === 'votes') {
                    processData.steps[processStepIndex].votes = payload.stepVotes;
                } else {
                    processData.steps[processStepIndex].isCompleted = payload.isCompleted
                }
               
                copyState[findTemplateIndex] = processData;
            }
        }
        state.updateStepVotesRequest = false;
        state.updateStepVotesSuccess = true;
        state.updateStepVotesFailure = false;
        localStorage.setItem("process", JSON.stringify(copyState));
        state.process = copyState;
      },
    updateStepVotesFailure: (state) => {
        state.updateStepVotesRequest = false;
        state.updateStepVotesSuccess = false;
        state.updateStepVotesFailure = false;
    },
    getProcessByProjectIdRequest: (state, action) => {
        state.getProcessByProjectId = true;
    },
    getProcessByProjectIdSuccess: (state, action) => { 
        state.getProcessByProjectId = false;
        state.projectProcess = action.payload ?? [];
    },
    getProcessByProjectIdFailure: (state) => { 
        state.getProcessByProjectId = false;
        state.projectProcess = [];
    },

    resetStatus: (state) => {
      state.isSaveProcessSuccess = false;
      state.isSaveProcessFailure = false;
      state.isEditProcessSuccess = false;
      state.isEditProcessFailure = false;
      state.isDeleteProcessSuccess = false;
      state.isDeleteProcessFailure = false;
      state.updateStepVotesFailure = false;
      state.updateStepVotesSuccess = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const  processActions = processTemplateSlice.actions

export default processTemplateSlice.reducer

import {all, takeLatest} from "redux-saga/effects";
import { organizationActions } from '../../actions/organizationsActions';
import { valuesActions } from "../../actions/valuesActions";
import { projectsActions } from "../../actions/projectsActions";
import { usersActions } from "~/store/actions/usersActions";
import { processTemplateActions } from "~/store/actions/processTemplateActions";
import { processActions } from "~/store/actions/processActions"


import { saveOrganizations, getOrganizations } from "./organizationsSaga";
import { saveValues, getValues, editValues } from "./valuesSaga";
import { saveProjects, getProjects, getProjectById } from "./projectsSaga";
import { getUsers, saveUsers, editUsers } from "./usersSaga";
import { getProcessTemplates, saveProcessTemplates, editProcessTemplates, deleteProcessTemplates, getProcessTemplateByProjectId } from "./processTemplateSaga";
import { getProcess, saveProcess, editProcess, deleteProcess, updateProcessStepVotes, getProcessByProjectId } from "./processSaga"


export default function* rootSagas() {
  yield all([
    // organization
    takeLatest(organizationActions.saveOrganizationsRequest.type, saveOrganizations),
    takeLatest(organizationActions.getOrganizationRequest.type, getOrganizations),

    // values
    takeLatest(valuesActions.saveValuesRequest.type, saveValues),
    takeLatest(valuesActions.getValuesRequest.type, getValues),
    takeLatest(valuesActions.editValuesRequest.type, editValues),

    // projects
    takeLatest(projectsActions.saveProjectsRequest.type, saveProjects),
    takeLatest(projectsActions.getProjectsRequest.type, getProjects),
    takeLatest(projectsActions.getProjectByIdRequest.type, getProjectById),


    // users
    takeLatest(usersActions.getUsersRequest.type, getUsers),
    takeLatest(usersActions.saveUsersRequest.type, saveUsers),
    takeLatest(usersActions.editUsersRequest.type, editUsers),


    // process template
    takeLatest(processTemplateActions.getProcessTemplateRequest.type, getProcessTemplates),
    takeLatest(processTemplateActions.saveProcessTemplateRequest.type, saveProcessTemplates),
    takeLatest(processTemplateActions.editProcessTemplateRequest.type, editProcessTemplates),
    takeLatest(processTemplateActions.deleteProcessTemplateRequest.type, deleteProcessTemplates),
    takeLatest(processTemplateActions.getProcessTemplateByProjectIdRequest.type, getProcessTemplateByProjectId),

    // process 
    takeLatest(processActions.getProcessRequest.type, getProcess),
    takeLatest(processActions.saveProcessRequest.type, saveProcess),
    takeLatest(processActions.editProcessRequest.type, editProcess),
    takeLatest(processActions.deleteProcessRequest.type, deleteProcess),
    takeLatest(processActions.updateStepVotesRequest.type, updateProcessStepVotes),
    takeLatest(processActions.getProcessByProjectIdRequest.type, getProcessByProjectId)

  ])
}

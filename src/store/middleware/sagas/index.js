
import {all, takeLatest} from "redux-saga/effects";
import { organizationActions } from '../../actions/organizationsActions';
import { valuesActions } from "../../actions/valuesActions";
import { projectsActions } from "../../actions/projectsActions";
import { usersActions } from "~/store/actions/usersActions";


import { saveOrganizations, getOrganizations } from "./organizationsSaga";
import { saveValues, getValues } from "./valuesSaga";
import { saveProjects, getProjects } from "./projectsSaga";
import { getUsers, saveUsers, editUsers } from "./usersSaga";


export default function* rootSagas() {
  yield all([
    // organization
    takeLatest(organizationActions.saveOrganizationsRequest.type, saveOrganizations),
    takeLatest(organizationActions.getOrganizationRequest.type, getOrganizations),

    // values
    takeLatest(valuesActions.saveValuesRequest.type, saveValues),
    takeLatest(valuesActions.getValuesRequest.type, getValues),

    // projects
    takeLatest(projectsActions.saveProjectsRequest.type, saveProjects),
    takeLatest(projectsActions.getProjectsRequest.type, getProjects),


    // users
    takeLatest(usersActions.getUsersRequest.type, getUsers),
    takeLatest(usersActions.saveUsersRequest.type, saveUsers),
    takeLatest(usersActions.editUsersRequest.type, editUsers),
  ])
}

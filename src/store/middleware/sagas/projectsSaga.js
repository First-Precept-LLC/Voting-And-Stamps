import { put } from 'redux-saga/effects';
import { v4 as uuidV4 } from "uuid";
import { projectsActions } from '../../actions/projectsActions';


export function* getProjects({ payload }) {
    const localProject = localStorage.getItem("projects");
    try {
      yield put({
        type: projectsActions.getProjectsSuccess.type,
        payload: localProject ? JSON.parse(localProject) : [],
      })
    } catch (error) {
      yield put({
        type: projectsActions.getProjectsFailure.type,
      })
    }
}


export function* saveProjects({payload}) {
  try {
    yield put({
      type: projectsActions.saveProjectsSuccess.type,
      payload: {
        ...payload,
        id: uuidV4()
      },
    })
  } catch (error) {
    yield put({
      type: projectsActions.saveProjectsFailure.type,
    })
  }
}


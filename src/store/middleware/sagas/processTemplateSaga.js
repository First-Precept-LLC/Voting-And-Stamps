import { put } from 'redux-saga/effects';
import { v4 as uuidV4 } from "uuid";
import { processTemplateActions } from '../../actions/processTemplateActions';


export function* getProcessTemplates({ payload }) {
    const localProcessTemplate = localStorage.getItem("processTemplates");
    try {
      yield put({
        type: processTemplateActions.getProcessTemplateSuccess.type,
        payload: localProcessTemplate ? JSON.parse(localProcessTemplate) : [],
      })
    } catch (error) {
      yield put({
        type: processTemplateActions.getProcessTemplateFailure.type,
      })
    }
}


export function* saveProcessTemplates({payload}) {
  try {
    yield put({
      type: processTemplateActions.saveProcessTemplateSuccess.type,
      payload: {
        ...payload,
        id: uuidV4()
      },
    })
  } catch (error) {
    yield put({
      type: processTemplateActions.saveProcessTemplateFailure.type,
    })
  }
}

export function* editProcessTemplates({payload}) {
    try {
      yield put({
        type: processTemplateActions.editProcessTemplateSuccess.type,
        payload: {
          ...payload
        },
      })
    } catch (error) {
      yield put({
        type: processTemplateActions.editProcessTemplateFailure.type,
      })
    }
  }

  export function* deleteProcessTemplates({payload}) {
    try {
      yield put({
        type: processTemplateActions.deleteProcessTemplateSuccess.type,
        payload
      })
    } catch (error) {
      yield put({
        type: processTemplateActions.deleteProcessTemplateFailure.type,
      })
    }
  }

  export function* getProcessTemplateByDepartmentId({payload}) {
    const localProcessTemplates = localStorage.getItem("processTemplates") ? JSON.parse(localStorage.getItem("processTemplates")) : [];
    const departmentProcessTemplates = localProcessTemplates?.filter((template) => template?.department?.id === payload);
    try {
      yield put({
        type: processTemplateActions.getProcessTemplateByDepartmentIdSuccess.type,
        payload: departmentProcessTemplates
      })
    } catch (error) {
      yield put({
        type: processTemplateActions.getProcessTemplateByDepartmentIdFailure.type,
      })
    }
  }


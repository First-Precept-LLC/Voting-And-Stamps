import { put } from 'redux-saga/effects';
import { v4 as uuidV4 } from "uuid";
import { departmentsActions } from '../../actions/departmentsActions';


export function* getDepartments({ payload }) {
    const localDepartment = localStorage.getItem("departments");
    try {
      yield put({
        type: departmentsActions.getDepartmentsSuccess.type,
        payload: localDepartment ? JSON.parse(localDepartment) : [],
      })
    } catch (error) {
      yield put({
        type: departmentsActions.getDepartmentsFailure.type,
      })
    }
}


export function* saveDepartments({payload}) {
  try {
    yield put({
      type: departmentsActions.saveDepartmentsSuccess.type,
      payload: {
        ...payload,
        id: uuidV4()
      },
    })
  } catch (error) {
    yield put({
      type: departmentsActions.saveDepartmentsFailure.type,
    })
  }
}

export function* getDepartmentById({payload}) {
  const localDepartments = localStorage.getItem("departments") ? JSON.parse(localStorage.getItem("departments")) : [];
  const department = localDepartments?.find((process) => process?.id === payload);
  try {
    yield put({
      type: departmentsActions.getDepartmentByIdSuccess.type,
      payload: department ?? {}
    })
  } catch (error) {
    yield put({
      type: departmentsActions.getDepartmentByIdFailure.type,
    })
  }
}


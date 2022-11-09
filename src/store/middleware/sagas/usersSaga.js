import { put } from 'redux-saga/effects';
import { v4 as uuidV4 } from "uuid";
import { usersActions } from '../../actions/usersActions';


export function* getUsers({ payload }) {
   const localValues = localStorage.getItem("users");
    try {
      yield put({
        type: usersActions.getUsersSuccess.type,
        payload: localValues ? JSON.parse(localValues) : payload,
      })
    } catch (error) {
      yield put({
        type: usersActions.getUsersFailure.type,
      })
    }
}


export function* saveUsers({payload}) {
  try {
    yield put({
      type: usersActions.saveUsersSuccess.type,
      payload: {
        ...payload,
        id: uuidV4()
      },
    })
  } catch (error) {
    yield put({
      type: usersActions.saveUsersFailure.type,
    })
  }
}

export function* editUsers({payload}) {
    try {
      yield put({
        type: usersActions.editUsersSuccess.type,
        payload,
      })
    } catch (error) {
      yield put({
        type: usersActions.editUsersFailure.type,
      })
    }
  }


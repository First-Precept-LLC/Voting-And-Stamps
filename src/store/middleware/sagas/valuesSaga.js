import { put } from 'redux-saga/effects';
import { v4 as uuidV4 } from "uuid";
import { valuesActions } from '../../actions/valuesActions';


export function* getValues({ payload }) {
   const localValues = localStorage.getItem("values");
    try {
      yield put({
        type: valuesActions.getValuesSuccess.type,
        payload: localValues ? JSON.parse(localValues) : [],
      })
    } catch (error) {
      yield put({
        type: valuesActions.getValuesFailure.type,
      })
    }
}


export function* saveValues({payload}) {
  try {
    yield put({
      type: valuesActions.saveValuesSuccess.type,
      payload: {
        ...payload,
        id: uuidV4()
      },
    })
  } catch (error) {
    yield put({
      type: valuesActions.saveValuesFailure.type,
    })
  }
}

export function* editValues({payload}) {
  try {
    yield put({
      type: valuesActions.editValuesSuccess.type,
      payload,
    })
  } catch (error) {
    yield put({
      type: valuesActions.editValuesFailure.type,
    })
  }
}


import { put } from 'redux-saga/effects';
import { v4 as uuidV4 } from "uuid";
import { processActions } from '../../actions/processActions';


export function* getProcess({ payload }) {
    const localProcess = localStorage.getItem("process");
    try {
      yield put({
        type: processActions.getProcessSuccess.type,
        payload: localProcess ? JSON.parse(localProcess) : [],
      })
    } catch (error) {
      yield put({
        type: processActions.getProcessFailure.type,
      })
    }
}


export function* saveProcess({payload}) {
  try {
    yield put({
      type: processActions.saveProcessSuccess.type,
      payload: {
        ...payload,
        id: uuidV4()
      },
    })
  } catch (error) {
    yield put({
      type: processActions.saveProcessFailure.type,
    })
  }
}

export function* editProcess({payload}) {
    try {
      yield put({
        type: processActions.editProcessSuccess.type,
        payload: {
          ...payload
        },
      })
    } catch (error) {
      yield put({
        type: processActions.editProcessFailure.type,
      })
    }
  }

  export function* deleteProcess({payload}) {
    try {
      yield put({
        type: processActions.deleteProcessSuccess.type,
        payload
      })
    } catch (error) {
      yield put({
        type: processActions.deleteProcessFailure.type,
      })
    }
  }

  export function* updateProcessStepVotes({payload}) {
    try {
      yield put({
        type: processActions.updateStepVotesSuccess.type,
        payload: {
          ...payload
        },
      })
    } catch (error) {
      yield put({
        type: processActions.updateStepVotesFailure.type,
      })
    }
  }


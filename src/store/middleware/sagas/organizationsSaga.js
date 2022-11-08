import { put } from 'redux-saga/effects'
import { v4 as uuidV4 } from "uuid";
import {organizationActions} from '../../actions/organizationsActions'

export function* saveOrganizations({payload}) {
  try {
    const requestData = {
        ...payload,
        id: payload._id || uuidV4()
    }
    yield put({
      type: organizationActions.saveOrganizationsSuccess.type,
      payload: requestData,
    })
  } catch (error) {
    yield put({
      type: organizationActions.saveOrganizationsFailure.type,
    })
  }
}

export function* getOrganizations() {
    try {
      const localOrganization = localStorage.getItem("organizations");
      yield put({
        type: organizationActions.getOrganizationsSuccess.type,
        payload: localOrganization ? JSON.parse(localOrganization) : null,
      })
    } catch (error) {
      yield put({
        type: organizationActions.getOrganizationsFailure.type,
      })
    }
  }

import {
    EXISTINGMEMBER_LOGIN_FAIL,
    EXISTINGMEMBER_LOGIN_REQUEST,
    EXISTINGMEMBER_LOGIN_SUCCESS,
    EXISTINGMEMBER_LOGOUT,
    EXISTINGMEMBER_REGISTER_FAIL,
    EXISTINGMEMBER_REGISTER_REQUEST,
    EXISTINGMEMBER_REGISTER_SUCCESS,
    EXISTINGMEMBER_UPDATE_FAIL,
    EXISTINGMEMBER_UPDATE_REQUEST,
    EXISTINGMEMBER_UPDATE_SUCCESS,
  } from '../constants/existingmemberConstants';
  export const existingmemberLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case EXISTINGMEMBER_LOGIN_REQUEST:
        return { loading: true };
      case EXISTINGMEMBER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case EXISTINGMEMBER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case EXISTINGMEMBER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  export const existingmemberRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case EXISTINGMEMBER_REGISTER_REQUEST:
        return { loading: true };
      case EXISTINGMEMBER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case EXISTINGMEMBER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const existingmemberUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case EXISTINGMEMBER_UPDATE_FAIL:
        return { loading: true };
      case EXISTINGMEMBER_UPDATE_REQUEST:
        return { loading: false, userInfo: action.payload, success: true };
      case EXISTINGMEMBER_UPDATE_SUCCESS:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
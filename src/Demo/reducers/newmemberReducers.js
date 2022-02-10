import {
    NEWMEMBER_LOGIN_FAIL,
    NEWMEMBER_LOGIN_REQUEST,
    NEWMEMBER_LOGIN_SUCCESS,
    NEWMEMBER_LOGOUT,
    NEWMEMBER_REGISTER_FAIL,
    NEWMEMBER_REGISTER_REQUEST,
    NEWMEMBER_REGISTER_SUCCESS,
    NEWMEMBER_UPDATE_FAIL,
    NEWMEMBER_UPDATE_REQUEST,
    NEWMEMBER_UPDATE_SUCCESS,
  } from '../constants/newmemberConstants';
  export const newmemberLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWMEMBER_LOGIN_REQUEST:
        return { loading: true };
      case NEWMEMBER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case NEWMEMBER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case NEWMEMBER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  export const newmemberRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWMEMBER_REGISTER_REQUEST:
        return { loading: true };
      case NEWMEMBER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case NEWMEMBER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const newmemberUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWMEMBER_UPDATE_FAIL:
        return { loading: true };
      case NEWMEMBER_UPDATE_REQUEST:
        return { loading: false, userInfo: action.payload, success: true };
      case NEWMEMBER_UPDATE_SUCCESS:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
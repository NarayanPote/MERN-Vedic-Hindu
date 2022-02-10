import {
    MEMBER_LOGIN_FAIL,
    MEMBER_LOGIN_REQUEST,
    MEMBER_LOGIN_SUCCESS,
    MEMBER_LOGOUT,
    MEMBER_REGISTER_FAIL,
    MEMBER_REGISTER_REQUEST,
    MEMBER_REGISTER_SUCCESS,
    MEMBER_UPDATE_FAIL,
    MEMBER_UPDATE_REQUEST,
    MEMBER_UPDATE_SUCCESS,
  } from '../constants/memberConstants';
  export const memberLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_LOGIN_REQUEST:
        return { loading: true };
      case MEMBER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case MEMBER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case MEMBER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  export const memberRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_REGISTER_REQUEST:
        return { loading: true };
      case MEMBER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case MEMBER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const memberUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_UPDATE_FAIL:
        return { loading: true };
      case MEMBER_UPDATE_REQUEST:
        return { loading: false, userInfo: action.payload, success: true };
      case MEMBER_UPDATE_SUCCESS:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
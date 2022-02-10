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
  import axios from 'axios';

  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type:  MEMBER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/member/login',
        { email, password },
        config
      );
  
      dispatch({ type:  MEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type:  MEMBER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type:  MEMBER_LOGOUT });
  };

  export const register = (name, mobile, email, address, country, state, city, adultmember, belowmember, password, confirmpassword ) => async (dispatch) => {
    try {
      dispatch({ type:  MEMBER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/member',
        {  name, mobile, email, address, country, state, city, adultmember, belowmember, password, confirmpassword  },
        config
      );
  
      dispatch({ type: MEMBER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: MEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: MEMBER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: MEMBER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/member/profile', user, config);
  
      dispatch({ type: MEMBER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: MEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: MEMBER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
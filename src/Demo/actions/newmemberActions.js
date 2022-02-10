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
  import axios from 'axios';

  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type:  NEWMEMBER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/newmember/login',
        { email, password },
        config
      );
  
      dispatch({ type:  NEWMEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type:  NEWMEMBER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type:  NEWMEMBER_LOGOUT });
  };

  export const register = (country, state, city, club, membername, mobilenumber, email, address, country1, state1, city1, adultmember, belowmember, password, confirmpassword ) => async (dispatch) => {
    try {
      dispatch({ type:  NEWMEMBER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/newmember',
        {  country, state, city, club, membername, mobilenumber, email, address, country1, state1, city1, adultmember, belowmember, password, confirmpassword },
        config
      );
  
      dispatch({ type: NEWMEMBER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: NEWMEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: NEWMEMBER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: NEWMEMBER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/NEWMEMBER/profile', user, config);
  
      dispatch({ type: NEWMEMBER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: NEWMEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: NEWMEMBER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
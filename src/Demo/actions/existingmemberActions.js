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
  import axios from 'axios';

  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type:  EXISTINGMEMBER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/existingmember/login',
        { email, password },
        config
      );
  
      dispatch({ type:  EXISTINGMEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type:  EXISTINGMEMBER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type:  EXISTINGMEMBER_LOGOUT });
  };

  export const register = (country, state, city, club, membername, mobilenumber, email, address, country1, state1, city1, adultmember, belowmember, password, confirmpassword ) => async (dispatch) => {
    try {
      dispatch({ type:  EXISTINGMEMBER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/existingmember',
        {  country, state, city, club, membername, mobilenumber, email, address, country1, state1, city1, adultmember, belowmember, password, confirmpassword },
        config
      );
  
      dispatch({ type: EXISTINGMEMBER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: EXISTINGMEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: EXISTINGMEMBER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXISTINGMEMBER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/existingmember/profile', user, config);
  
      dispatch({ type: EXISTINGMEMBER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: EXISTINGMEMBER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: EXISTINGMEMBER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
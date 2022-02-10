import {
    CLUB_LOGIN_FAIL,
    CLUB_LOGIN_REQUEST,
    CLUB_LOGIN_SUCCESS,
    CLUB_LOGOUT,
    CLUB_REGISTER_FAIL,
    CLUB_REGISTER_REQUEST,
    CLUB_REGISTER_SUCCESS,
    CLUB_UPDATE_FAIL,
    CLUB_UPDATE_REQUEST,
    CLUB_UPDATE_SUCCESS,
    CLUB_LIST_FAIL,
    CLUB_LIST_REQUEST,
    CLUB_LIST_SUCCESS,
  } from '../constants/clubConstants';
  import axios from 'axios';

  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: CLUB_LOGIN_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/clubusers/login',
        { email, password },
        config
      );
  
      dispatch({ type: CLUB_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CLUB_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: CLUB_LOGOUT });
  };

  export const register = (name, contactpersonname, contactpersonnumber, email, password, confirmpassword, address , country, state, city, pincode, website, clubregistrationnumber, yearofestablishment, trustformed, aregister, gregister) => async (dispatch) => {
    try {
      dispatch({ type: CLUB_REGISTER_REQUEST });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/clubusers',
        { name, contactpersonname, contactpersonnumber, email, password, confirmpassword, address , country, state, city, pincode, website, clubregistrationnumber, yearofestablishment, trustformed, aregister, gregister },
        config
      );
  
      dispatch({ type: CLUB_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: CLUB_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CLUB_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listNotes = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: CLUB_LIST_REQUEST,
      });
    
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/clubusers`, config);
  
      dispatch({
        type: CLUB_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CLUB_LIST_FAIL,
        payload: message,
      });
    }
  };

  

  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: CLUB_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/clubusers/profile', user, config);
  
      dispatch({ type: CLUB_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: CLUB_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CLUB_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
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
    CLUB_LIST_REQUEST,
    CLUB_LIST_SUCCESS,
    CLUB_LIST_FAIL,
  } from './clubConstants'; 
  import config from "./../config";
  const initialState = {

    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    notes: [] ,

    //reducer: { userInfo: userInfoFromStorage },
 
  };


  export const clubLoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLUB_LOGIN_REQUEST:
        return { loading: true };
      case CLUB_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload  };

      
      case CLUB_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case CLUB_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  export const clubRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLUB_REGISTER_REQUEST:
        return { loading: true };
      case CLUB_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case CLUB_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const clubListReducer = (state = initialState, action) => {
    // console.log(state, '=====', action);
     switch (action.type) {
       case CLUB_LIST_REQUEST:
         return { loading: true };
       case CLUB_LIST_SUCCESS:
         return { loading: false, notes: action.payload };
       case CLUB_LIST_FAIL:
         return { loading: false, error: action.payload };
   
       default:
         return state;
     }
   };
  export const clubUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLUB_UPDATE_REQUEST:
        return { loading: true };
      case CLUB_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case CLUB_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  

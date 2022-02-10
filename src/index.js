import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { createStore,  applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
//import clubRegisterReducer from './Demo/reducers/clubReducers';
import reducer from './store/reducer';
import{clubLoginReducer,  clubRegisterReducer,clubUpdateReducer} from './store/clubReducers';
import loadState from './store/localstorage';
import config from './config';

import './assets/scss/style.scss';

import './i18n';


// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//   reducer: { userInfo: userInfoFromStorage },
// };

 const persistedState = loadState();

console.log(persistedState);

// const reducers = combineReducers({
//         reducer,
//     // clubLogin: clubLoginReducer,
//     // clubRegister: clubRegisterReducer,
//     // clubUpdate: clubUpdateReducer,
  
//   });

//   const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//     clubLogin: { userInfo: userInfoFromStorage },
// };

const middleWare = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleWare)),
    );

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

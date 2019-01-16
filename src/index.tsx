import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

import gameReducer from './store/reducers/game';
import tableReducer from './store/reducers/table';
import appReducer from './store/reducers/app';
import authReducer from './store/reducers/auth';
import playerReducer from './store/reducers/player';

const rootReducer = combineReducers({
  game: gameReducer,
  table: tableReducer,
  player: playerReducer,
  app: appReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

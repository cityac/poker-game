import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import '~/utils/touchHandler';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

import gameReducer from './store/reducers/game';
import tableReducer from './store/reducers/table';
import welcomeReducer from './store/reducers/welcome';
import authReducer from './store/reducers/auth';
import playerReducer from './store/reducers/player';

import * as TouchHandler from '~/utils/touchHandler';

const rootReducer = combineReducers({
  game: gameReducer,
  table: tableReducer,
  player: playerReducer,
  welcome: welcomeReducer,
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
TouchHandler.run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

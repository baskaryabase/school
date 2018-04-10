'use strict';
import { applyMiddleware, createStore } from 'redux';
// import logger from 'redux-logger';
import React from 'react';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

export default store;

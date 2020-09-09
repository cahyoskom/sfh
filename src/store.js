import { createStore, applyMiddleware, compose } from 'redux';

// Middlewares
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// Import custom components
import rootReducer from './reducers';
import rootSaga from './sagas';

/*
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
}
*/

function loadFromLocalStorage() {
  try {
    // const serializedState = localStorage.getItem('state')
    // if(serializedState === null) return undefined
    // return JSON.parse(serializedState)
    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunkMiddleware, sagaMiddleware];
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

/*
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  // saveToLocalStorage(state);
});
*/

export default store;

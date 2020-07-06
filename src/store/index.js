// import { createStore, applyMiddleware, compose } from 'redux';

// // middlewares
// import thunkMiddleware from 'redux-thunk'
// import logger from 'redux-logger'

// // Import custom components
// import rootReducer from '../reducers';


// function saveToLocalStorage(state) {
//     try {
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('state', serializedState)
//     }catch(e){
//         console.log(e);
//     }
// }

// function loadFromLocalStorage() {
//     try {
//         const serializedState = localStorage.getItem('state')
//         if(serializedState === null) return undefined
//         return JSON.parse(serializedState)
//     }catch (e) {
//         console.log(e)
//         return undefined
//     }
// }

// const persistedState = loadFromLocalStorage()

// /**
//  * Create a Redux store that holds the app state.
//  */
// const store = createStore(rootReducer, persistedState, compose(
//     applyMiddleware(thunkMiddleware),

//     //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
//     window.devToolsExtension ? window.devToolsExtension() : function (f) {
//         return f;
//     }
// ));

// const unsubscribe = store.subscribe(() => {
//     const state = store.getState();
//     saveToLocalStorage(state);
// });

// export default store;
import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';

// Import custom components
import rootReducer from '../reducers';
import rootSaga from '../sagas';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        // const serializedState = localStorage.getItem('state')
        // if(serializedState === null) return undefined
        // return JSON.parse(serializedState)
        return undefined
    }catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()
const sagaMiddleware = createSagaMiddleware()
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
const store = createStore(
    rootReducer,
    persistedState, 
    composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    // saveToLocalStorage(state);
});

export default store;
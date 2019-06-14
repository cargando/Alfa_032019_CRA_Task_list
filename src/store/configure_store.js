import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
import { deleteMiddleware } from './middleware';

const logger = createLogger({
	// ...options
});


const configureStore = (middleware, initialState) => {
	let store = {};
	if (process.env.NODE_ENV === 'development') {
		const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		store = createStore(
			rootReducer,
			composeEnhancer(applyMiddleware(thunkMiddleware, middleware, /* logger, */ deleteMiddleware))
		);
	} else {
		store = createStore(rootReducer, applyMiddleware(thunkMiddleware, middleware, deleteMiddleware));
	}

	return store;
};

export default configureStore;
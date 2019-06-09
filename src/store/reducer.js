import { combineReducers } from 'redux';
import * as ACT from './actions';

function rootReducer(store, action) {
	switch (action.type) {
		case ACT.DATA_TASK_EDIT:
			return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

		case ACT.DATA_TASK_ADD:
			return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

		case ACT.DATA_TASK_DELETE:
			return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

		case ACT.DATA_TASK_UPDATE:
			return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

		default:
			return store;
	}

}
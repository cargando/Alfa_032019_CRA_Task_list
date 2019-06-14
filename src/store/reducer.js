import { combineReducers } from 'redux';
import * as ACT from './actions';

const initialState = { // GLOBAL STORE - первичная инициализация, т.е. как выглядит стор на этапе первого рендера прилаги
	taskList: [], // можно добавлять сюда столько полей, сколько вам нужно для работы приложения
};

function rootReducer(store = initialState, action) {
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

export default combineReducers({
	app: rootReducer,
	// user: userReducer,

})
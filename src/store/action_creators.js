import { FORM_ADD, FORM_EDIT } from "../lib/const";
import * as ACT from './actions';

export function loadTaskList() {

	let taskList = [];
	try {
		taskList = JSON.parse(localStorage.getItem("TASKS"));
	} catch (e) {
		console.log("Couldn't init JSON from Local Storage: ", e.message);
	}
	return { taskList };
}

export function editTask(payload) {
	return {
		type: ACT.DATA_TASK_EDIT,
		payload: {
			...payload,
			formSate: FORM_EDIT,
		},
	};
}

export function resetForm() {
	return {
		type: ACT.DATA_TASK_FORM_RESET,
		payload: {
			taskForEdit: null,
			formSate: FORM_ADD,
		},
	};
}

export function updateTask(payload) {
	localStorage.setItem("TASKS", JSON.stringify(payload.taskList));
	return {
		type: ACT.DATA_TASK_UPDATE,
		payload,
	};
}

export function addTask(payload) {
	const taskList = payload.taskList.slice();
	taskList.push(payload.data);
	localStorage.setItem("TASKS", JSON.stringify(taskList));

	return {
		type: ACT.DATA_TASK_ADD,
		payload: { taskList },
	};
}

export function saveTask(payload) {
	console.log("SAVE ", payload)
	const taskList = payload.taskList.slice();
	const data = payload.data;
	const id = payload.id;
	taskList[id] = data;

	localStorage.setItem("TASKS", JSON.stringify(taskList));

	return {
		type: ACT.DATA_TASK_ADD,
		payload: { taskList },
	};
}

// { taskList, id}
export function deleteTask(payload) {
	const taskList = payload.taskList.slice();
	// const taskList = payload.taskList.filter((item, index)=>{ if (item===payload.deleteId) return index});
	taskList.splice(payload.deleteId, 1);
	localStorage.setItem("TASKS", JSON.stringify(taskList));
	return {
		type: ACT.DATA_TASK_DELETE,
		payload: { taskList },
	};
}


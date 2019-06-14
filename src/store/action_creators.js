import * as ACT from './actions';

export function editTask(payload) {
	return {
		type: ACT.DATA_TASK_EDIT,
		payload,
	};
}

export function updateTask(payload) {
	return {
		type: ACT.DATA_TASK_UPDATE,
		payload,
	};
}

export function addTask(payload) {
	const taskList = payload.taskList.slice();
	taskList.push(payload);
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
	taskList.splice(payload.deleteId, 1);
	localStorage.setItem("TASKS", JSON.stringify(taskList));
	return {
		type: ACT.DATA_TASK_DELETE,
		payload: { taskList },
	};
}


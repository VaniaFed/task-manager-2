export {
	handleAddTask,
	initPressTask,
	pressTaskListener,
	removeTaskListener,
	taskListeners,
} from './todo__task.controller';

export {
	addTask,
	createTask,
	getTasks,
	getTasksByStatus,
	removeTaskById,
	removeTasksByStatus,
	setActive,
	setCompleted,
	setStatusById,
	updateTasks,
} from './todo__task.model';

export {
	appendTaskToDOM,
	markTaskAsActive,
	markTaskAsCompleted,
	removeCompletedTasksFromDOM,
	removeTaskFromDOM,
	renderTasks,
} from './todo__task.view';

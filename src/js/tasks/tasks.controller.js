import { addTask, createTask, getTasks, removeTaskById, setActive, setCompleted } from './tasks.model';
import {
	appendTaskToDOM,
	hideTasks,
	markTaskAsActive,
	markTaskAsCompleted,
	removeTaskFromDOM,
	renderTasks,
	showEmptyState,
} from './tasks.view';

const input = document.querySelector('.input');

const clearInput = () => {
	input.value = '';
};

const removeTaskListener = (element) => {
	element.addEventListener('click', ({ target }) => {
		const { id } = target.parentNode.parentNode.dataset;
		removeTaskById(id);
		removeTaskFromDOM(id);

		if (getTasks().length === 0) {
			hideTasks();
			showEmptyState();
		}
	});
};

const initRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.todo-task__remove-btn');
	removeBtns.forEach((btn) => {
		removeTaskListener(btn);
	});
};

const reinit = () => {
	// renderTasks();
	// initRemoveTask();
	// showNoTasksIfNecessary();
	// initPressTask();
	// initRemoveTask();
	// updateNumberTask();
	// initCounterValue();
	// toggleClearCompletedVisibility();
};

export const pressTaskListener = (task) => {
	task.addEventListener('click', ({ target }) => {
		if (!target.classList.contains('todo-task__remove-btn')) {
			const { id } = task.dataset;
			if (!task.classList.contains('todo__item_completed')) {
				setCompleted(id);
				markTaskAsCompleted(task);
			} else {
				setActive(id);
				markTaskAsActive(task);
			}

			// if (state.filter === 'Active' || state.filter === 'Completed') {
			// 	reinit();
			// } else {
			// 	updateNumberTask();
			// 	initCounterValue();
			// }

			// toggleClearCompletedVisibility();
		}
	});
};

export const initPressTask = () => {
	const tasksList = document.querySelectorAll('.todo-task');
	tasksList.forEach((task) => pressTaskListener(task));
};

const listeners = [removeTaskListener, pressTaskListener];

const handleAddTask = (e) => {
	if (e.key === 'Enter' || e.type === 'blur') {
		const taskValue = e.target.value;
		if (taskValue) {
			const newTask = createTask(taskValue);
			addTask(newTask);
			appendTaskToDOM(newTask, listeners);
		}

		clearInput();
	}
};

export const initAddTaskOnEnter = () => {
	input.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			handleAddTask(e);
		}
	});
};

const initAddTaskOnFocusOut = () => {
	input.addEventListener('blur', (e) => {
		handleAddTask(e);
	});
};

renderTasks();
initAddTaskOnEnter();
initAddTaskOnFocusOut();
initRemoveTask();
initPressTask();

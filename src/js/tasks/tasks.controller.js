import { updateFilterCounter } from '@blocks/filter/__counter/filter__counter.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { updateClearCompletedVisibility } from '@blocks/clear-completed/clear-completed.view';
import { getFilter } from '@blocks/filter/filter.model';
import { addTask, createTask, removeTaskById, setActive, setCompleted } from './tasks.model';
import {
	appendTaskToDOM,
	hideTasks,
	shouldShowEmptyState,
	markTaskAsActive,
	markTaskAsCompleted,
	removeTaskFromDOM,
	renderTasks,
	showEmptyState,
} from './tasks.view';

const input = document.querySelector('.input');

input.focus();

const clearInput = () => {
	input.value = '';
};

const removeTaskListener = (element) => {
	element.addEventListener('click', ({ target }) => {
		const { id } = target.parentNode.parentNode.dataset;
		removeTaskById(id);
		removeTaskFromDOM(id);
		updateTodoTitleCounter();
		updateFilterCounter();
		updateClearCompletedVisibility();

		if (shouldShowEmptyState()) {
			hideTasks();
			showEmptyState();
		}
		input.focus();
	});
};

const initRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.todo-task__remove-btn');
	removeBtns.forEach((btn) => {
		removeTaskListener(btn);
	});
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

			updateFilterCounter();
			updateClearCompletedVisibility();

			if (getFilter() !== 'All') {
				removeTaskFromDOM(id);
				updateTodoTitleCounter();
			}

			if (shouldShowEmptyState()) {
				hideTasks();
				showEmptyState();
			}
		}
	});
};

export const initPressTask = () => {
	const tasksList = document.querySelectorAll('.todo-task');
	tasksList.forEach((task) => pressTaskListener(task));
};

export const taskListeners = [removeTaskListener, pressTaskListener];

const handleAddTask = (e) => {
	if (e.key === 'Enter' || e.type === 'blur') {
		const taskValue = e.target.value;
		if (taskValue) {
			const newTask = createTask(taskValue);
			addTask(newTask);

			if (getFilter() === 'Active' || getFilter() === 'All') {
				appendTaskToDOM(newTask, taskListeners);
			}

			updateTodoTitleCounter();
			updateFilterCounter();
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

const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
clearInputIcon.addEventListener('mousedown', () => {
	input.value = '';
});

initAddTaskOnFocusOut();

input.addEventListener('focus', () => {
	clearInputIcon.classList.add('todo__input-wrapper_icon_shown');
});

input.addEventListener('blur', () => {
	clearInputIcon.classList.remove('todo__input-wrapper_icon_shown');
});

input.addEventListener('keydown', (e) => {
	console.log(e.key);
	if (e.key === 'Escape' || e.key === 'Tab') {
		input.value = '';
		input.blur();
	}
});

document.addEventListener('keypress', () => {
	input.focus();
});

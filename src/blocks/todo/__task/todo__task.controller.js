import { updateFilterCounter } from '@blocks/filter/__counter/filter__counter.view';
import { getFilter } from '@blocks/todo/__filter/todo__filter.model';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { updateClearCompletedVisibility } from '@blocks/clear-completed/clear-completed.view';
import { showEmptyState } from '@blocks/todo/__empty-state/todo__empty-state.view';
import { shouldShowEmptyState } from '@blocks/todo/__empty-state/todo__empty-state.model';
import { clearInput } from '@blocks/todo/__input/todo__input';
import { addTask, createTask, removeTaskById, setActive, setCompleted } from './todo__task.model';
import {
	appendTaskToDOM,
	hideTasks,
	markTaskAsActive,
	markTaskAsCompleted,
	removeTaskFromDOM,
	renderTasks,
} from './todo__task.view';

const input = document.querySelector('.input');

export const removeTaskListener = (element) => {
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
	const tasks = document.querySelectorAll('.todo-task');
	tasks.forEach((task) => pressTaskListener(task));
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

renderTasks();
initAddTaskOnEnter();
initAddTaskOnFocusOut();
initPressTask();

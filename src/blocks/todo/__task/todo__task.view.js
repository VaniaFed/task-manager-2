import { shouldShowEmptyState } from '@blocks/todo/__empty-state/todo__empty-state.model';
import { hideEmptyState, showEmptyState } from '@blocks/todo/__empty-state/todo__empty-state.view';
import { getFilter } from '@blocks/todo/__filter/todo__filter.model';
import { getTasks, getTasksByStatus } from './todo__task.model';

const applyListeners = (elements, listeners) => {
	listeners.forEach((listener, index) => listener(elements[index]));
};

const createTaskElement = ({ id, status, value }, listeners = []) => {
	const taskElement = document.createElement('div');
	taskElement.classList.add('todo-task');
	taskElement.classList.add('todo__item');

	if (status === 'Completed') {
		taskElement.classList.add('todo__item_completed');
	}

	taskElement.dataset.id = id;
	taskElement.dataset.status = status;
	taskElement.innerHTML = `<div class="checkbox todo-task__checkbox"><input type="checkbox" ${
		status === 'Completed' && 'checked'
	} class="checkbox__input"> <span class="fake-control fake-control_type_checkbox"></span><p class="task__text">${value}</p><img class="todo-task__remove-btn" src="assets/cross-23.svg" alt="Remove"></div>`;

	const btnRemove = taskElement.querySelector('.todo-task__remove-btn');
	applyListeners([btnRemove, taskElement], listeners);

	return taskElement;
};

const shouldFilter = () => getFilter() !== 'All';

const tasksList = document.getElementsByClassName('todo__list')[0];

export const hideTasks = () => {
	tasksList.classList.add('hidden');
};

export const showTasks = () => {
	tasksList.classList.remove('hidden');
};

export const removeTaskFromDOM = (id) => {
	tasksList.childNodes.forEach((task) => {
		if (task.dataset.id === id) {
			task.remove();
			return 0;
		}
	});
};

export const appendTaskToDOM = (task, listeners) => {
	// следует вынести отсюда
	if (tasksList.classList.contains('hidden')) {
		showTasks();
		hideEmptyState();
	}
	tasksList.prepend(createTaskElement(task, listeners));
};

export const markTaskAsCompleted = (task) => {
	task.classList.add('todo__item_completed');
	task.getElementsByClassName('checkbox__input')[0].checked = true;
};

export const markTaskAsActive = (task) => {
	task.classList.remove('todo__item_completed');
	task.getElementsByClassName('checkbox__input')[0].checked = false;
};

export const renderTasks = (listeners) => {
	const tasks = shouldFilter() ? getTasksByStatus(getFilter()) : getTasks();

	if (tasks.length > 0) {
		tasksList.innerHTML = '';
		showTasks();
		tasks.forEach((task) => {
			appendTaskToDOM(task, listeners);
		});
	} else {
		hideTasks();
	}

	if (shouldShowEmptyState()) {
		showEmptyState();
	} else {
		hideEmptyState();
	}
};

export const removeCompletedTasksFromDOM = () => {
	[...tasksList.childNodes].forEach((task) => {
		if (task.classList.contains('todo__item_completed')) {
			task.remove();
		}
	});
};

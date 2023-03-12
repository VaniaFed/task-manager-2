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

	if (status === 'Completed') {
		taskElement.classList.add('todo-task_completed');
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

export const removeTaskFromDOM = (id) => {
	tasksList.childNodes.forEach((task: HTMLElement) => {
		if (task.dataset.id === id) {
			task.remove();
			return 0;
		}
	});
};

export const appendTaskToDOM = (task, listeners) => {
	tasksList.prepend(createTaskElement(task, listeners));
};

export const markTaskAsCompleted = (task) => {
	task.classList.add('todo-task_completed');
	task.getElementsByClassName('checkbox__input')[0].checked = true;
};

export const markTaskAsActive = (task) => {
	task.classList.remove('todo-task_completed');
	task.getElementsByClassName('checkbox__input')[0].checked = false;
};

export const renderTasks = (listeners?: ((element: any) => void)[]) => {
	const tasks = shouldFilter() ? getTasksByStatus(getFilter()) : getTasks();

	tasksList.innerHTML = '';

	if (shouldShowEmptyState()) {
		showEmptyState();
	} else {
		hideEmptyState();
		tasks.forEach((task) => {
			appendTaskToDOM(task, listeners);
		});
	}
};

export const removeCompletedTasksFromDOM = () => {
	[...tasksList.childNodes].forEach((task: HTMLElement) => {
		if (task.classList.contains('todo-task_completed')) {
			task.remove();
		}
	});
};

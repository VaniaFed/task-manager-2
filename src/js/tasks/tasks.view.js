import { getTasks, getTasksByStatus } from './tasks.model';
import { getFilter } from '../filter/filter.model';

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
	taskElement.innerHTML = `<div class="checkbox todo-task__checkbox"><input type="checkbox" ${
		status === 'Completed' && 'checked'
	} class="checkbox__input"> <span class="fake-control fake-control_type_checkbox"></span><p class="task__text">${value}</p><img class="todo-task__remove-btn" src="assets/cross-23.svg" alt="Remove"></div>`;

	const btnRemove = taskElement.querySelector('.todo-task__remove-btn');
	applyListeners([btnRemove, taskElement], listeners);

	return taskElement;
};

const shouldFilter = () => getFilter() !== 'All';

const tasksList = document.getElementsByClassName('todo__list')[0];

export const renderTasks = () => {
	const tasks = shouldFilter() ? getTasksByStatus(getFilter()) : getTasks();
	console.log(getTasks());

	if (tasks.length > 0) {
		tasksList.innerHTML = '';
		tasksList.classList.remove('hidden-hard');
		tasks.forEach((task) => {
			tasksList.prepend(createTaskElement(task));
		});
	} else {
		tasksList.classList.add('hidden-hard');
	}
};

export const removeTaskFromDOM = (id) => {
	tasksList.childNodes.forEach((task) => {
		if (task.dataset.id === id) {
			task.remove();
		}
	});
};

export const appendTaskToDOM = (task, listeners) => {
	tasksList.prepend(createTaskElement(task, listeners));
};

// export const hideTasks = () => {}
// export const showTasks = () => {}

// export const hideEmptyState = () => {}
// export const showEmptyState = () => {}

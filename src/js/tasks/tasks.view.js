import { getFilter } from '@blocks/filter/filter.model';
import { getTasks, getTasksByStatus } from './tasks.model';

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

const emptyState = document.querySelector('.empty-state');

const formEmptyState = () => {
	const noTasksImage = document.querySelector('.empty-state__image');
	const noTasksText = document.querySelector('.empty-state__text');

	switch (getFilter()) {
		case 'All': {
			noTasksImage.classList.remove('hidden');
			noTasksText.innerText = 'Как-то пустовато... Добавим новую задачу?';

			break;
		}

		case 'Active': {
			noTasksImage.classList.add('hidden');
			noTasksText.innerText = 'Активных задач пока нет';

			break;
		}

		case 'Completed': {
			noTasksImage.classList.add('hidden');
			noTasksText.innerText = 'Вы еще не закончили ни одну задачу';

			break;
		}

		default:
			break;
	}
};

export const hideEmptyState = () => {
	emptyState.classList.add('hidden');
};

export const showEmptyState = () => {
	emptyState.classList.remove('hidden');
	formEmptyState();
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
	// вынести отсюда
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

export const isNoTasks = () => getTasks().length === 0 && getFilter() === 'All';
export const isNoActiveTasks = () => getTasksByStatus('Active').length === 0 && getFilter() === 'Active';
export const isNoCompletedTasks = () => getTasksByStatus('Completed').length === 0 && getFilter() === 'Completed';

export const shouldShowEmptyState = () => isNoTasks() || isNoActiveTasks() || isNoCompletedTasks();

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

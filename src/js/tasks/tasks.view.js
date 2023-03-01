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

export const hideTasks = () => {
	tasksList.classList.add('hidden-hard');
};

export const showTasks = () => {
	tasksList.classList.remove('hidden-hard');
};

const emptyState = document.querySelector('.no-tasks');

const formEmptyState = () => {
	const noTasksImage = document.querySelector('.no-tasks__image');
	const noTasksText = document.querySelector('.no-tasks__text');

	switch (getFilter()) {
		case 'All': {
			noTasksImage.classList.remove('hidden-hard');
			noTasksText.innerText = 'Как-то пустовато... Добавим новую задачу?';

			break;
		}

		case 'Active': {
			noTasksImage.classList.add('hidden-hard');
			noTasksText.innerText = 'Активных задач пока нет';

			break;
		}

		case 'Completed': {
			noTasksImage.classList.add('hidden-hard');
			noTasksText.innerText = 'Вы еще не закончили ни одну задачу';

			break;
		}

		default:
			break;
	}
};

export const hideEmptyState = () => {
	emptyState.classList.add('hidden-hard');
};

export const showEmptyState = () => {
	emptyState.classList.remove('hidden-hard');
	formEmptyState();
};

const shouldShowEmptyState = () =>
	(getTasks().length === 0 && getFilter() === 'All') ||
	(getTasksByStatus('Active').length === 0 && getFilter() === 'Active') ||
	(getTasksByStatus('Completed').length === 0 && getFilter() === 'Completed');

export const renderTasks = () => {
	const tasks = shouldFilter() ? getTasksByStatus(getFilter()) : getTasks();

	if (tasks.length > 0) {
		tasksList.innerHTML = '';
		showTasks();
		tasks.forEach((task) => {
			tasksList.prepend(createTaskElement(task));
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

export const removeTaskFromDOM = (id) => {
	tasksList.childNodes.forEach((task) => {
		if (task.dataset.id === id) {
			task.remove();
		}
	});
};

export const appendTaskToDOM = (task, listeners) => {
	if (tasksList.classList.contains('hidden-hard')) {
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

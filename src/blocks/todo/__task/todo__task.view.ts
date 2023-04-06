import { getTasks, getTasksByStatus } from './todo__task.model';
import { ITask } from 'types/task';
import { getFilter } from 'blocks/todo/__filter';
import { shouldShowEmptyState, hideEmptyState, showEmptyState } from 'blocks/todo/__empty-state';

type TypeListener = (element: HTMLElement) => void;

const applyListeners = (elements: HTMLElement[], listeners: TypeListener[]) => {
	listeners.forEach((listener, index) => listener(elements[index]));
};

const createTaskElement = ({ id, status, text }: ITask, listeners: TypeListener[] = []) => {
	const taskElement = document.createElement('div');
	taskElement.classList.add('todo-task');

	if (status === 'Completed') {
		taskElement.classList.add('todo-task_completed');
	}

	taskElement.dataset.id = id;
	taskElement.dataset.status = status;
	taskElement.innerHTML = `<div class="checkbox todo-task__checkbox"><input type="checkbox" ${
		status === 'Completed' && 'checked'
	} class="checkbox__input"> <span class="fake-control fake-control_type_checkbox"></span><p class="task__text">${text}</p><img class="todo-task__remove-btn" src="assets/cross-23.svg" alt="Remove"></div>`;

	const btnRemove = taskElement.querySelector('.todo-task__remove-btn') as HTMLButtonElement;
	applyListeners([btnRemove, taskElement], listeners);

	return taskElement;
};

const shouldFilter = () => getFilter() !== 'All';

const tasksList = document.getElementsByClassName('todo__list')[0] as HTMLUListElement;

export const removeTaskFromDOM = (id: ITask['id']) => {
	tasksList.childNodes.forEach((task) => {
		if ((task as HTMLElement).dataset.id === id) {
			task.remove();
			return 0;
		}
	});
};

export const appendTaskToDOM = (task: ITask, listeners?: TypeListener[]) => {
	tasksList.prepend(createTaskElement(task, listeners));
};

export const markTaskAsCompleted = (task: HTMLElement) => {
	task.classList.add('todo-task_completed');
	(task.getElementsByClassName('checkbox__input')[0] as HTMLInputElement).checked = true;
};

export const markTaskAsActive = (task: HTMLElement) => {
	task.classList.remove('todo-task_completed');
	(task.getElementsByClassName('checkbox__input')[0] as HTMLInputElement).checked = false;
};

export const renderTasks = (listeners?: TypeListener[]) => {
	const tasks = shouldFilter() ? getTasksByStatus(getFilter() as ITask['status']) : getTasks();

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
	[...tasksList.childNodes].forEach((task) => {
		if ((task as HTMLElement).classList.contains('todo-task_completed')) {
			task.remove();
		}
	});
};

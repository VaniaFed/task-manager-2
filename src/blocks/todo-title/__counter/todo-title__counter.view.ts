import { getTasks, getTasksByStatus } from 'blocks/todo/__task';
import { ITask } from 'types/task';
import { getFilter } from 'blocks/todo/__filter';

const todoTitleCounter = document.querySelector('.todo-title__counter');

const _updateTodoTitleCounter = (value: number) => {
	todoTitleCounter!.textContent = `(${value})`;
};

export const updateTodoTitleCounter = () => {
	if (getFilter() === 'All') {
		_updateTodoTitleCounter(getTasks().length);
	} else {
		_updateTodoTitleCounter(getTasksByStatus(getFilter() as ITask['status']).length);
	}
};

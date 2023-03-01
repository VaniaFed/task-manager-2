/* eslint-disable no-underscore-dangle */
import { getTasks, getTasksByStatus } from '@js/tasks/tasks.model';
import { getFilter } from '@js/filter/filter.model';

const todoTitleCounter = document.querySelector('.todo-title__counter');

const _updateTodoTitleCounter = (value) => {
	todoTitleCounter.innerText = `(${value})`;
};

export const updateTodoTitleCounter = () => {
	if (getFilter() === 'All') {
		_updateTodoTitleCounter(getTasks().length);
	} else {
		_updateTodoTitleCounter(getTasksByStatus(getFilter()).length);
	}
};

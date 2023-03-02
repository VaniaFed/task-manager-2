import { getTasks, getTasksByStatus } from '@blocks/todo/__task/todo__task.model';
import { getFilter } from '@blocks/todo/__filter/todo__filter.model';

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

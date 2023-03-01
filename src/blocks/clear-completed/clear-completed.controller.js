import { updateFilterCounter } from '@blocks/tab/__counter/filter__counter.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { removeTasksByStatus } from '@js/tasks/tasks.model';
import { hideTasks, shouldShowEmptyState, showEmptyState, removeCompletedTasksFromDOM } from '@js/tasks/tasks.view';
import { updateClearCompletedVisibility } from './clear-completed.view';

const clearCompleted = document.querySelector('.clear-completed');

export const pressClearComplitedListener = () => {
	clearCompleted.addEventListener('click', () => {
		removeTasksByStatus('Completed');
		removeCompletedTasksFromDOM();
		updateTodoTitleCounter();
		updateFilterCounter();
		updateClearCompletedVisibility();

		if (shouldShowEmptyState()) {
			hideTasks();
			showEmptyState();
		}
	});
};

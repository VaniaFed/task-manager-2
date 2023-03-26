import { updateClearCompletedVisibility } from './clear-completed.view';
import { removeTasksByStatus, removeCompletedTasksFromDOM } from 'blocks/todo/__task';
import { updateFilterCounter } from 'blocks/filter/__counter';
import { updateTodoTitleCounter } from 'blocks/todo-title/__counter';
import { shouldShowEmptyState, showEmptyState } from 'blocks/todo/__empty-state';

const clearCompleted = document.querySelector('.clear-completed');

export const pressClearCompletedListener = () => {
	clearCompleted!.addEventListener('click', () => {
		removeTasksByStatus('Completed');
		removeCompletedTasksFromDOM();
		updateTodoTitleCounter();
		updateFilterCounter();
		updateClearCompletedVisibility();

		if (shouldShowEmptyState()) {
			showEmptyState();
		}
	});
};

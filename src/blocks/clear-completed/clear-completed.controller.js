import { shouldShowEmptyState } from '@blocks/todo/__empty-state/todo__empty-state.model';
import { showEmptyState } from '@blocks/todo/__empty-state/todo__empty-state.view';
import { updateFilterCounter } from '@blocks/filter/__counter/filter__counter.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { removeTasksByStatus } from '@blocks/todo/__task/todo__task.model';
import { removeCompletedTasksFromDOM } from '@blocks/todo/__task/todo__task.view';
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
			showEmptyState();
		}
	});
};

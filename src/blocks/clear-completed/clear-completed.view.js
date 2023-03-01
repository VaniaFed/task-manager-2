import { getTasksByStatus } from '@js/tasks/tasks.model';

const clearCompleted = document.querySelector('.clear-completed');

const showClearCompleted = () => {
	clearCompleted.classList.remove('hidden');
};

const hideClearCompleted = () => {
	clearCompleted.classList.add('hidden');
};

export const updateClearCompletedVisibility = () => {
	if (getTasksByStatus('Completed').length > 0) {
		showClearCompleted();
	} else {
		hideClearCompleted();
	}
};

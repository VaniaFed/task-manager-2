import { getTasks, getTasksByStatus } from '@blocks/todo/__task/todo__task.model';

const allFilterCounter = document.querySelector('[data-filter-counter=All]');
const activeFilterCounter = document.querySelector('[data-filter-counter=Active]');
const completedFilterCounter = document.querySelector('[data-filter-counter=Completed]');

export const updateFilterCounter = () => {
	const allTasks = getTasks();
	const activeTasks = getTasksByStatus('Active');
	const completedTasks = getTasksByStatus('Completed');

	allFilterCounter.textContent = allTasks.length;
	activeFilterCounter.textContent = activeTasks.length;
	completedFilterCounter.textContent = completedTasks.length;
};

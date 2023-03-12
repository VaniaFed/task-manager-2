import { getTasks, getTasksByStatus } from '@blocks/todo/__task/todo__task.model';

const allFilterCounter = document.querySelector('[data=all-filter-counter]');
const activeFilterCounter = document.querySelector('[data=active-filter-counter]');
const completedFilterCounter = document.querySelector('[data=completed-filter-counter]');

export const updateFilterCounter = () => {
	const allTasks = getTasks();
	const activeTasks = getTasksByStatus('Active');
	const completedTasks = getTasksByStatus('Completed');

	allFilterCounter.textContent = allTasks.length;
	activeFilterCounter.textContent = activeTasks.length;
	completedFilterCounter.textContent = completedTasks.length;
};

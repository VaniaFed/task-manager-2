export const getTasksFromStorage = () => JSON.parse(localStorage.getItem('tasks'));

export const setTasksToStorage = (newTasks) => {
	localStorage.setItem('tasks', JSON.stringify(newTasks));
};

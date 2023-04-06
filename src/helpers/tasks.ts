import { ITask } from 'types/task';

const _getTasksFromStorage = (): ITask[] => JSON.parse(localStorage.getItem('tasks')!) || [];

const isTaskValid = (task: ITask): boolean => !!task.id && !!task.status && !!task.text;

export const getTasksFromStorage = (): ITask[] => {
	return _getTasksFromStorage().filter((task) => isTaskValid(task));
};

export const setTasksToStorage = (newTasks: ITask[]) => {
	localStorage.setItem('tasks', JSON.stringify(newTasks));
};

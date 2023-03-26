import { ITask } from 'types/task';
export const getTasksFromStorage = (): ITask[] => JSON.parse(localStorage.getItem('tasks')!) || [];

export const setTasksToStorage = (newTasks: ITask[]) => {
	localStorage.setItem('tasks', JSON.stringify(newTasks));
};

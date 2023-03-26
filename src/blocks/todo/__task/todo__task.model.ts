import { ITask } from 'types/task';
import { generateId } from 'utils/utilities';
import { getTasksFromStorage, setTasksToStorage } from 'helpers/tasks';

let tasks: ITask[] = getTasksFromStorage() || [];

export const getTasks = (): ITask[] => (!tasks ? getTasksFromStorage() : tasks);

export const getTasksByStatus = (status: ITask['status']): ITask[] =>
	getTasks().filter((task) => task.status === status) || [];

export const updateTasks = (newTasks = [] as ITask[]) => {
	tasks = newTasks;
	setTasksToStorage(newTasks);
};

export const createTask = (text: ITask['text']): ITask => ({
	id: generateId(),
	status: 'Active',
	text,
});

export const addTask = (task: ITask) => {
	const tasks = getTasks() || [];
	updateTasks([...tasks, task]);
};

export const removeTaskById = (id: ITask['id']) => {
	const tasks = getTasks();

	const filtered = tasks.filter((task) => task.id !== id);

	updateTasks(filtered);
};

export const removeTasksByStatus = (status: ITask['status']) => {
	const tasks = getTasks();

	const filtered = tasks.filter((task) => task.status !== status);
	updateTasks(filtered);
};

const changeStatus = (task: ITask, status: ITask['status']) => ({ ...task, status });

export const setStatusById = (id: ITask['id'], status: ITask['status']) => {
	const tasks = getTasks();

	const mapped = tasks.map((task) => (task.id === id ? changeStatus(task, status) : task));

	updateTasks(mapped);
};

export const setActive = (id: ITask['id']) => {
	setStatusById(id, 'Active');
};

export const setCompleted = (id: ITask['id']) => {
	setStatusById(id, 'Completed');
};

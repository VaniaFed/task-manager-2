import { generateId } from '@utilities/utilities';
import { getTasksFromStorage, setTasksToStorage } from '@services/tasks';

let tasks = getTasksFromStorage() || [];

export const getTasks = () => (!tasks ? getTasksFromStorage() : tasks);

export const getTasksByStatus = (status) => getTasks().filter((task) => task.status === status) || [];

export const updateTasks = (newTasks = []) => {
	tasks = newTasks;
	setTasksToStorage(newTasks);
};

export const createTask = (value) => ({
	id: generateId(),
	status: 'Active',
	value,
});

export const addTask = (task) => {
	const tasks = getTasks() || [];
	updateTasks([...tasks, task]);
};

export const removeTaskById = (id) => {
	const tasks = getTasks();

	const filtered = tasks.filter((task) => task.id !== id);

	updateTasks(filtered);
};

export const removeTasksByStatus = (status) => {
	const tasks = getTasks();

	const filtered = tasks.filter((task) => task.status !== status);
	updateTasks(filtered);
};

const changeStatus = (task, status) => ({ ...task, status });

export const setStatusById = (id, status) => {
	const tasks = getTasks();

	const mapped = tasks.map((task) => (task.id === id ? changeStatus(task, status) : task));

	updateTasks(mapped);
};

export const setActive = (id) => {
	setStatusById(id, 'Active');
};

export const setCompleted = (id) => {
	setStatusById(id, 'Completed');
};

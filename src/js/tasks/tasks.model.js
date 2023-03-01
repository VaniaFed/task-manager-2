import { generateId } from '@utilities/utilities';

export const getTasks = () => JSON.parse(localStorage.getItem('tasks'));

export const getTasksByStatus = (status) => getTasks().filter((task) => task.status === status) || [];

export const updateTasks = (newTaskState = {}) => {
	localStorage.setItem('tasks', JSON.stringify(newTaskState));
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

	const filtered = tasks.filter((task) => Number(task.id) !== Number(id));

	updateTasks(filtered);
};

const changeStatus = (task, status) => ({ ...task, status });

export const setStatusById = (id, status) => {
	const tasks = getTasks();

	const mapped = tasks.map((task) => (Number(task.id) === Number(id) ? changeStatus(task, status) : task));

	updateTasks(mapped);
};

export const setActive = (id) => {
	setStatusById(id, 'Active');
};

export const setCompleted = (id) => {
	setStatusById(id, 'Completed');
};

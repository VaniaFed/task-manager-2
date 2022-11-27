'use sctict';

const state = {
	tasks: [
	],
	filter: 'All',
};

const newTask = ({name, id}) => (
	[...state.tasks, {
		name,
		status: 'Active',
		id,
	}]
);

const updateTasks = newTaskState => {
	state.tasks = newTaskState;
};

const changeTaskStatus = (id, status) => {
	const newTasksState = state.tasks.map(task => {
		if (task.id === Number(id)) {
			return {
				...task,
				status,
			};
		}

		return task;
	});
	updateTasks(newTasksState);
};

const generateId = () => Math.floor(Math.random() * 1000);

const shouldFilter = () => state.filter !== 'All';

const filterTasks = () => state.tasks.filter(task => task.status === state.filter);

// Filter view

const filterControlls = document.querySelectorAll('.filter__item');

const handleClickFilter = () => {
	filterControlls.forEach(currentFilter => {
		currentFilter.addEventListener('click', e => {
			if (!e.target.classList.contains('tab_active')) {
				clearFiltersClass();

				e.target.classList.add('tab_active');

				updateActiveFilterValue(e.target.innerText);

				renderTasks(state.filter);
				handleRemoveTask();
				initPressTask();
			}
		});
	});
};

const clearFiltersClass = () => {
	filterControlls.forEach(filterell => {
		filterell.classList.remove('tab_active');
	});
};

const updateActiveFilterValue = val => {
	state.filter = val;
};

// Tasks view

const input = document.querySelector('.form__input');
const tasksList = document.getElementsByClassName('tasks-list')[0];
const tasksNumber = document.getElementsByClassName('tasks-controls__left')[0];

const handleAddTask = () => {
	input.addEventListener('keypress', e => {
		if (e.key === 'Enter') {
			const taskInputName = e.target.value;
			if (taskInputName) {
				const id = generateId();
				updateTasks(newTask({name: taskInputName, id}));
				updateNumberTaskView();
				renderTasks();
				handleRemoveTask();
				initPressTask();
			}

			e.target.value = '';
		}
	});
};

const handleRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.task__remove-btn');
	removeBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			const taskElement = e.target.parentNode.parentNode;
			const newTasksState = state.tasks.filter(task => task.id !== Number(taskElement.dataset.id));
			updateTasks(newTasksState);
			updateNumberTaskView();
			renderTasks();
			handleRemoveTask();
		});
	});
};

const initPressTask = () => {
	const tasksList = document.querySelectorAll('.task');
	tasksList.forEach(task => {
		task.addEventListener('click', e => {
			if (!e.target.classList.contains('task__remove-btn')) {
				const taskId = task.dataset.id;
				if (!task.classList.contains('task_done')) {
					changeTaskStatus(taskId, 'Completed');
					task.classList.add('task_done');
					task.getElementsByClassName('checkbox__input')[0].checked = true;
				} else {
					changeTaskStatus(taskId, 'Active');
					task.classList.remove('task_done');
					task.getElementsByClassName('checkbox__input')[0].checked = false;
				}
			}
		});
	});
};

const renderTasks = () => {
	const tasks = shouldFilter() ? filterTasks() : state.tasks;
	tasksList.innerHTML = '';
	tasks.forEach(task => {
		tasksList.prepend(newTaskElement(task.name, task.id, task.status));
	});
};

const newTaskElement = (taskName, id, status) => {
	const taskElement = document.createElement('div');
	taskElement.classList.add('task');
	if (status === 'Completed') {
		taskElement.classList.add('task_done');
	}

	taskElement.dataset.id = id;
	taskElement.innerHTML = `<div class="checkbox"><input type="checkbox" class="checkbox__input"> <span class="checkbox__fake fake__control"></span><p class="task__text">${taskName}</p><img class="task__remove-btn" src="icons/cross-23.svg" alt="Remove"></div>`;
	return taskElement;
};

const updateNumberTaskView = () => {
	tasksNumber.innerText = `${state.tasks.length} items left`;
};

const handleRemoveCompleted = () => {
	const clearBtn = document.querySelector('.tasks-clear-completed');
	clearBtn.addEventListener('click', () => {
		const newTasksState = state.tasks.filter(task => task.status !== 'Completed');
		updateTasks(newTasksState);
		updateNumberTaskView();
		renderTasks();
		handleRemoveTask();
	});
};

renderTasks();
updateNumberTaskView();
handleAddTask();
handleClickFilter();

handleRemoveTask();

handleRemoveCompleted();

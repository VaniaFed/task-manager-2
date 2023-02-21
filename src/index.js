'use sctict';

const state = {
	tasks: [],
	filter: 'All',
};

const addTask = ({name, id}) => (
	[...state.tasks, {
		name,
		status: 'Active',
		id,
	}]
);

const updateTasks = newTaskState => {
	state.tasks = newTaskState;
};

const setTaskStatusById = (id, status) => {
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

const getTasksByStatus = status => state.tasks.filter(task => task.status === status);

const getFilteredTasks = () => state.tasks.filter(task => task.status === state.filter);

const removeTaskById = id => {
	const newTasksState = state.tasks.filter(task => task.id !== Number(id));
	updateTasks(newTasksState);
};

const shouldFilter = () => state.filter !== 'All';

const generateId = () => Math.floor(Math.random() * 1000);

// Filter view

const filterControlls = document.querySelectorAll('.tab__item');

const initClickFilter = () => {
	filterControlls.forEach(currentFilter => {
		currentFilter.addEventListener('click', e => {
			if (!e.target.classList.contains('tab__item_active')) {
				removeAllActiveClasses();

				e.target.classList.add('tab__item_active');

				const currentFilter = e.target.dataset.filter;
				updateActiveFilter(currentFilter);

				reinit();
			}
		});
	});
};

const removeAllActiveClasses = () => {
	filterControlls.forEach(filterEl => {
		filterEl.classList.remove('tab__item_active');
	});
};

const updateActiveFilter = val => {
	state.filter = val;
};

// Tasks view

const input = document.querySelector('.input');
const tasksList = document.getElementsByClassName('todo__list')[0];
const tasksNumber = document.getElementsByClassName('tasks-number')[0];

const initAddTaskOnEnter = () => {
	input.addEventListener('keypress', e => {
		if (e.key === 'Enter') {
			handleAddTask(e);
		}
	});
};

const initAddTaskOnFocusOut = () => {
	input.addEventListener('blur', e => {
		handleAddTask(e);
	});
};

const handleAddTask = e => {
	if (e.key === 'Enter' || e.type === 'blur') {
		const taskInputName = e.target.value;
		if (taskInputName) {
			const newTask = {
				name: taskInputName,
				id: generateId(),
			};

			updateTasks(addTask(newTask));
			reinit();
		}

		e.target.value = '';
	}
};

const initRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.todo-task__remove-btn');
	removeBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			const taskId = e.target.parentNode.parentNode.dataset.id;
			removeTaskById(taskId);
			reinit();
		});
	});
};

const initPressTask = () => {
	const tasksList = document.querySelectorAll('.todo-task');
	tasksList.forEach(task => {
		task.addEventListener('click', e => {
			if (!e.target.classList.contains('todo-task__remove-btn')) {
				const taskId = task.dataset.id;
				if (!task.classList.contains('todo__item_completed')) {
					setTaskStatusById(taskId, 'Completed');
					task.classList.add('todo__item_completed');
					task.getElementsByClassName('checkbox__input')[0].checked = true;
				} else {
					setTaskStatusById(taskId, 'Active');
					task.classList.remove('todo__item_completed');
					task.getElementsByClassName('checkbox__input')[0].checked = false;
				}

				if (state.filter === 'Active' || state.filter === 'Completed') {
					reinit();
				} else {
					updateNumberTask();
				}

				// вызывать это по удалению, по нажатию на таску и по нажатию на кнопку clear completed
				// вынести в функцию
				const completedTasks = Array.from(getTasksByStatus('Completed'));
				const clearCompleted = document.querySelector('.clear-completed');

				if (completedTasks.length > 0) {
					clearCompleted.classList.remove('hidden');
				} else {
					clearCompleted.classList.add('hidden');
				}
			}
		});
	});
};

const renderTasks = () => {
	tasksList.innerHTML = '';
	const tasks = shouldFilter() ? getFilteredTasks() : state.tasks;
	tasks.forEach(task => {
		tasksList.prepend(newTaskElement(task.name, task.id, task.status));
	});
};

const newTaskElement = (taskName, id, status) => {
	const taskElement = document.createElement('div');
	taskElement.classList.add('todo-task');
	taskElement.classList.add('todo__item');

	if (status === 'Completed') {
		taskElement.classList.add('todo__item_completed');
	}

	taskElement.dataset.id = id;
	taskElement.innerHTML = `<div class="checkbox todo-task__checkbox"><input type="checkbox" ${status === 'Completed' && 'checked'} class="checkbox__input"> <span class="fake-control fake-control_type_checkbox"></span><p class="task__text">${taskName}</p><img class="todo-task__remove-btn" src="icons/cross-23.svg" alt="Remove"></div>`;
	return taskElement;
};

const updateNumberTask = () => {
	tasksNumber.innerText = `${getTasksByStatus('Active').length} items left`;
};

const initRemoveCompleted = () => {
	const clearCompleted = document.querySelector('.clear-completed');

	clearCompleted.addEventListener('click', () => {
		const activeTasks = getTasksByStatus('Active');
		updateTasks(activeTasks);
		reinit();
	});
};

const reinit = () => {
	renderTasks();
	initPressTask();
	initRemoveTask();
	updateNumberTask();
};

updateNumberTask();

initAddTaskOnEnter();

initAddTaskOnFocusOut();

initClickFilter();

initRemoveCompleted();

input.focus();

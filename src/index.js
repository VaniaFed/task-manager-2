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

const generateId = () => Math.floor(Math.random() * 1000);

const shouldFilter = () => state.filter !== 'All';

const filterTasks = () => state.tasks.filter(task => task.status === state.filter);

// Filter view

const filterControlls = document.querySelectorAll('.tab__item');

const initClickFilter = () => {
	filterControlls.forEach(currentFilter => {
		currentFilter.addEventListener('click', e => {
			if (!e.target.classList.contains('tab__item_active')) {
				clearFiltersClass();

				e.target.classList.add('tab__item_active');

				updateActiveFilterValue(e.target.innerText);

				renderTasks(state.filter);
				initRemoveTask();
				initPressTask();
			}
		});
	});
};

const clearFiltersClass = () => {
	filterControlls.forEach(filterell => {
		filterell.classList.remove('tab__item_active');
	});
};

const updateActiveFilterValue = val => {
	state.filter = val;
};

// Tasks view

const input = document.querySelector('.input');
const tasksList = document.getElementsByClassName('todo-list')[0];
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
			updateNumberTaskView();
			renderTasks();
			initRemoveTask();
			initPressTask();
		}

		e.target.value = '';
	}
};

const initRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.todo-task__remove-btn');
	removeBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			const taskElement = e.target.parentNode.parentNode;
			const newTasksState = state.tasks.filter(task => task.id !== Number(taskElement.dataset.id));
			updateTasks(newTasksState);
			updateNumberTaskView();
			renderTasks();
			initRemoveTask();
			initPressTask();
		});
	});
};

const initPressTask = () => {
	const tasksList = document.querySelectorAll('.todo-task');
	tasksList.forEach(task => {
		task.addEventListener('click', e => {
			if (!e.target.classList.contains('todo-task__remove-btn')) {
				const taskId = task.dataset.id;
				if (!task.classList.contains('task_done')) {
					setTaskStatusById(taskId, 'Completed');
					task.classList.add('task_done');
					task.getElementsByClassName('checkbox__input')[0].checked = true;
				} else {
					setTaskStatusById(taskId, 'Active');
					task.classList.remove('task_done');
					task.getElementsByClassName('checkbox__input')[0].checked = false;
				}
			}
		});
	});
};

const renderTasks = () => {
	tasksList.innerHTML = '';
	const tasks = shouldFilter() ? filterTasks() : state.tasks;
	tasks.forEach(task => {
		tasksList.prepend(newTaskElement(task.name, task.id, task.status));
	});
};

const newTaskElement = (taskName, id, status) => {
	const taskElement = document.createElement('div');
	taskElement.classList.add('todo-task');
	taskElement.classList.add('todo-list__item');

	if (status === 'Completed') {
		taskElement.classList.add('task_done');
	}

	taskElement.dataset.id = id;
	taskElement.innerHTML = `<div class="checkbox"><input type="checkbox" ${status === 'Completed' && 'checked'} class="checkbox__input"> <span class="fake-control fake-control_type_checkbox"></span><p class="task__text">${taskName}</p><img class="todo-task__remove-btn" src="icons/cross-23.svg" alt="Remove"></div>`;
	return taskElement;
};

const updateNumberTaskView = () => {
	tasksNumber.innerText = `${state.tasks.length} items left`;
};

const initRemoveCompleted = () => {
	const clearBtn = document.querySelector('.clear-completed');

	clearBtn.addEventListener('click', () => {
		const newTasksState = state.tasks.filter(task => task.status !== 'Completed');
		updateTasks(newTasksState);
		updateNumberTaskView();
		renderTasks();
		initRemoveTask();
	});
};

renderTasks();

updateNumberTaskView();

initAddTaskOnEnter();

initAddTaskOnFocusOut();

initClickFilter();

initRemoveTask();

initRemoveCompleted();

input.focus();

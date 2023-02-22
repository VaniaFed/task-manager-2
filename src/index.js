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

				updateTitle();

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
					initSubtextValue();
				}

				toggleClearCompletedVisibility();
			}
		});
	});
};

const renderTasks = () => {
	tasksList.innerHTML = '';
	const tasks = shouldFilter() ? getFilteredTasks() : state.tasks;

	if (tasks.length > 0) {
		tasksList.classList.remove('hidden-hard');
		tasks.forEach(task => {
			tasksList.prepend(newTaskElement(task.name, task.id, task.status));
		});
	} else {
		tasksList.classList.add('hidden-hard');
	}
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

const initClearCompleted = () => {
	const clearCompleted = document.querySelector('.clear-completed');

	clearCompleted.addEventListener('click', () => {
		const activeTasks = getTasksByStatus('Active');
		updateTasks(activeTasks);
		reinit();
	});
};

const toggleClearCompletedVisibility = () => {
	const completedTasks = Array.from(getTasksByStatus('Completed'));
	const clearCompleted = document.querySelector('.clear-completed');

	if (completedTasks.length > 0) {
		clearCompleted.classList.remove('hidden');
	} else {
		clearCompleted.classList.add('hidden');
	}
};

const reinit = () => {
	renderTasks();
	showNoTasksIfNecessary();
	initPressTask();
	initRemoveTask();
	updateNumberTask();
	toggleClearCompletedVisibility();
	initSubtextValue();
};

const updateTitle = () => {
	const title = document.getElementsByClassName('todo-title')[0];
	const subtext = document.getElementsByClassName('subtext')[0];

	// const titleVal = title.textContent;
	const subtextVal = subtext.textContent;

	const newSubtext = document.createElement('span');
	newSubtext.classList.add('subtext');
	newSubtext.innerText = subtextVal;

	title.innerText = state.filter;
	title.appendChild(newSubtext);

	// const regex = /\s\(.+\)/;
	// const id = titleVal.search(regex);
	// console.log(id);
	// console.log(titleVal.split(regex));
};

const initSubtextValue = () => {
	const titleSubtext = document.querySelector('.todo-title > .subtext');

	switch (state.filter) {
		case 'All': {
			titleSubtext.textContent = state.tasks.length;
			break;
		}

		case 'Active': {
			titleSubtext.textContent = getTasksByStatus('Active').length;
			break;
		}

		case 'Completed': {
			titleSubtext.textContent = getTasksByStatus('Completed').length;
			break;
		}

		default:
	}

	const tabSubtexts = document.querySelectorAll('.tab__subtext');
	tabSubtexts[0].innerText = state.tasks.length;
	tabSubtexts[1].innerText = getTasksByStatus('Active').length;
	tabSubtexts[2].innerText = getTasksByStatus('Completed').length;

	// tabSubtexts.forEach(tabSubtext => {
	// 	console.log(tabSubtext);
	// 	tabSubtext.innerText =
	// });
};

updateNumberTask();

initAddTaskOnEnter();

initClickFilter();

initClearCompleted();

input.focus();

const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
clearInputIcon.addEventListener('mousedown', () => {
	input.value = '';
});

initAddTaskOnFocusOut();

input.addEventListener('focus', () => {
	const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
	clearInputIcon.classList.add('todo__input-wrapper_icon_shown');
});

input.addEventListener('blur', () => {
	const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
	clearInputIcon.classList.remove('todo__input-wrapper_icon_shown');
});

input.addEventListener('keydown', e => {
	console.log(e.key);
	if (e.key === 'Escape' || e.key === 'Tab') {
		input.value = '';
		input.blur();
	}
});

document.addEventListener('keypress', () => {
	input.focus();
});

const showNoTasksIfNecessary = () => {
	const noTasks = document.querySelector('.no-tasks');
	if (
		(state.tasks.length === 0 && state.filter === 'All')
		|| (getTasksByStatus('Active').length === 0 && state.filter === 'Active')
		|| (getTasksByStatus('Completed').length === 0 && state.filter === 'Completed')
	) {
		noTasks.classList.remove('hidden-hard');
		switch (state.filter) {
			case 'All': {
				const noTasksImage = document.querySelector('.no-tasks__image');
				noTasksImage.classList.remove('hidden-hard');

				const noTasksText = document.querySelector('.no-tasks__text');
				noTasksText.innerText = 'Как-то пустовато... Добавим новую задачу?';

				break;
			}

			case 'Active': {
				const noTasksImage = document.querySelector('.no-tasks__image');
				noTasksImage.classList.add('hidden-hard');

				const noTasksText = document.querySelector('.no-tasks__text');
				noTasksText.innerText = 'Активных задач пока нет';

				break;
			}

			case 'Completed': {
				const noTasksImage = document.querySelector('.no-tasks__image');
				noTasksImage.classList.add('hidden-hard');

				const noTasksText = document.querySelector('.no-tasks__text');
				noTasksText.innerText = 'Вы еще не закончили ни одну задачу';

				break;
			}

			default:
				break;
		}
	} else {
		const noTasks = document.querySelector('.no-tasks');
		noTasks.classList.add('hidden-hard');
	}
};

showNoTasksIfNecessary();

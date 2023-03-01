/* eslint-disable */
'use sctict';

// import './index.html';
import './index.scss';
import './icons/cross-23.svg';

import {
	getTasks,
	addTask,
	getTasksByStatus,
	setStatusById,
	setActive,
	setCompleted,
	removeTaskById,
} from './js/tasks/tasks.model';
import { getFilter, setFilter } from './js/filter/filter.model';
import './js/tasks/tasks.controller';

import { createTaskElement, renderTasks } from './js/tasks/tasks.view';

// const task = getTasks()[0];
// console.log(createTaskElement(task));
// setFilter('All');
// console.log(getFilter());

// addTask('kljdsflj');
// removeTaskById(453);
// setActive(488);
setCompleted(953);
// console.log(setFilter('Completed'));

// renderTasks();
// console.log(getTasks());

// перейти на localStorage чтобы хранились в сессии данные

// const state = {
// 	tasks: [],
// 	filter: 'All',
// };

// // Filter view

// const filterControlls = document.querySelectorAll('.tab__item');

// const initClickFilter = () => {
// 	filterControlls.forEach((currentFilter) => {
// 		currentFilter.addEventListener('click', (e) => {
// 			if (!e.target.classList.contains('tab__item_active')) {
// 				removeAllActiveClasses();

// 				e.target.classList.add('tab__item_active');

// 				const currentFilter = e.target.dataset.filter;
// 				updateActiveFilter(currentFilter);

// 				updateTitle();

// 				reinit();
// 			}
// 		});
// 	});
// };

// const removeAllActiveClasses = () => {
// 	filterControlls.forEach((filterEl) => {
// 		filterEl.classList.remove('tab__item_active');
// 	});
// };

// const updateActiveFilter = (val) => {
// 	state.filter = val;
// };

// // Tasks view

// const tasksNumber = document.getElementsByClassName('tasks-number')[0];

// const updateNumberTask = () => {
// 	tasksNumber.innerText = `${getTasksByStatus('Active').length} осталось`;
// };

// const initClearCompleted = () => {
// 	const clearCompleted = document.querySelector('.clear-completed');

// 	clearCompleted.addEventListener('click', () => {
// 		const activeTasks = getTasksByStatus('Active');
// 		updateTasks(activeTasks);
// 		reinit();
// 	});
// };

// const toggleClearCompletedVisibility = () => {
// 	const completedTasks = Array.from(getTasksByStatus('Completed'));
// 	const clearCompleted = document.querySelector('.clear-completed');

// 	if (completedTasks.length > 0) {
// 		clearCompleted.classList.remove('hidden');
// 	} else {
// 		clearCompleted.classList.add('hidden');
// 	}
// };

// const updateTitle = () => {
// 	const title = document.getElementsByClassName('todo-title')[0];
// 	const counter = document.getElementsByClassName('counter')[0];

// 	const counterVal = counter.textContent;

// 	const newCounter = document.createElement('span');
// 	newCounter.classList.add('counter');
// 	newCounter.innerText = `${counterVal})`;

// 	switch (state.filter) {
// 		case 'All':
// 			title.innerText = 'Все задачи';
// 			break;

// 		case 'Active':
// 			title.innerText = 'Активные';
// 			break;

// 		case 'Completed':
// 			title.innerText = 'Завершенные';
// 			break;

// 		default:
// 			break;
// 	}

// 	title.appendChild(newCounter);
// };

// const initCounterValue = () => {
// 	const titleCounter = document.querySelector('.todo-title > .counter');

// 	switch (state.filter) {
// 		case 'All': {
// 			titleCounter.textContent = `(${state.tasks.length})`;
// 			break;
// 		}

// 		case 'Active': {
// 			titleCounter.textContent = `(${getTasksByStatus('Active').length})`;
// 			break;
// 		}

// 		case 'Completed': {
// 			titleCounter.textContent = `(${getTasksByStatus('Completed').length})`;
// 			break;
// 		}

// 		default:
// 	}

// 	const tabCounters = document.querySelectorAll('.tab__counter');
// 	tabCounters[0].innerText = `(${state.tasks.length})`;
// 	tabCounters[1].innerText = `(${getTasksByStatus('Active').length})`;
// 	tabCounters[2].innerText = `(${getTasksByStatus('Completed').length})`;

// 	// tabCounters.forEach(tabCounter => {
// 	// 	console.log(tabCounter);
// 	// 	tabCounter.innerText =
// 	// });
// };

// updateNumberTask();

// initAddTaskOnEnter();

// initClickFilter();

// initClearCompleted();

// input.focus();

// const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
// clearInputIcon.addEventListener('mousedown', () => {
// 	input.value = '';
// });

// initAddTaskOnFocusOut();

// input.addEventListener('focus', () => {
// 	const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
// 	clearInputIcon.classList.add('todo__input-wrapper_icon_shown');
// });

// input.addEventListener('blur', () => {
// 	const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');
// 	clearInputIcon.classList.remove('todo__input-wrapper_icon_shown');
// });

// input.addEventListener('keydown', (e) => {
// 	console.log(e.key);
// 	if (e.key === 'Escape' || e.key === 'Tab') {
// 		input.value = '';
// 		input.blur();
// 	}
// });

// document.addEventListener('keypress', () => {
// 	input.focus();
// });

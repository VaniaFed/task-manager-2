import { initPressTask, renderTasks } from 'blocks/todo/__task';
import { initAddTaskOnFocusOut, initAddTaskOnEnter } from 'blocks/todo/__input';
import { initRemoveTask } from 'blocks/todo-task/__remove-btn';
import { clearInputListener } from 'blocks/todo/__input-wrapper/__icon';

import { getFilter, initClickFilter, makeFilterActiveAccordingToStore } from 'blocks/todo/__filter';
import { updateFilterCounter } from 'blocks/filter/__counter';
import { updateTodoTitle } from 'blocks/todo-title';
import { updateTodoTitleCounter } from 'blocks/todo-title/__counter';
import { updateClearCompletedVisibility, pressClearCompletedListener } from 'blocks/clear-completed';

const onInit = () => {
	renderTasks();
	initPressTask();
	initRemoveTask();
	initAddTaskOnEnter();
	initAddTaskOnFocusOut();

	initClickFilter();
	makeFilterActiveAccordingToStore();
	updateFilterCounter();

	updateTodoTitle(getFilter());
	updateTodoTitleCounter();
	updateClearCompletedVisibility();
	pressClearCompletedListener();
	clearInputListener();
};

onInit();

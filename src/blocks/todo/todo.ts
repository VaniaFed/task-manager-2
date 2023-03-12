import '@blocks/todo/__filter/todo__filter.controller';
import '@blocks/todo/__input-wrapper/__icon/todo__input-wrapper__icon.controller';

import { initPressTask } from '@blocks/todo/__task/todo__task.controller';
import { getFilter } from '@blocks/todo/__filter/todo__filter.model';
import { updateTodoTitle } from '@blocks/todo-title/todo-title.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { updateFilterCounter } from '@blocks/filter/__counter/filter__counter.view';
import { updateClearCompletedVisibility } from '@blocks/clear-completed/clear-completed.view';
import { pressClearComplitedListener } from '@blocks/clear-completed/clear-completed.controller';
import { initRemoveTask } from '@blocks/todo-task/__remove-btn/todo-task__remove-btn.controller';
import { renderTasks } from './__task/todo__task.view';

const onInit = () => {
	renderTasks();
	initPressTask();
	initRemoveTask();

	updateTodoTitle(getFilter());
	updateTodoTitleCounter();
	updateFilterCounter();
	updateClearCompletedVisibility();
	pressClearComplitedListener();
};

onInit();

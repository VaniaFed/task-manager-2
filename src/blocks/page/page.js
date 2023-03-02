import '@js/tasks/tasks.controller';
import '@blocks/filter/filter.controller';
import { getFilter } from '@blocks/filter/filter.model';

import { updateTodoTitle } from '@blocks/todo-title/todo-title.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { updateFilterCounter } from '@blocks/filter/__counter/filter__counter.view';
import { updateClearCompletedVisibility } from '@blocks/clear-completed/clear-completed.view';
import { pressClearComplitedListener } from '@blocks/clear-completed/clear-completed.controller';

const onInit = () => {
	updateTodoTitle(getFilter());
	updateTodoTitleCounter();
	updateFilterCounter();
	updateClearCompletedVisibility();
	pressClearComplitedListener();
};

onInit();

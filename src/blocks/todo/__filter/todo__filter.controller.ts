import { updateTodoTitle } from '@blocks/todo-title/todo-title.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { renderTasks } from '@blocks/todo/__task/todo__task.view';
import { taskListeners } from '@blocks/todo/__task/todo__task.controller';
import { getFilter, setFilter } from './todo__filter.model';
import { removeAllActiveClasses, makeFilterActive } from './todo__filter.view';

const filterControll = document.querySelectorAll('.filter__item');

const shouldFilter = (filter) => !filter.classList.contains('filter__item_active');

const initClickFilter = () => {
	filterControll.forEach((currentFilter) => {
		currentFilter.addEventListener('click', (e) => {
			const filter = e.target as HTMLElement;
			if (shouldFilter(filter)) {
				removeAllActiveClasses(filterControll);
				makeFilterActive(filter);

				const filterValue = filter.dataset.filter;
				setFilter(filterValue);

				updateTodoTitle(filterValue);
				updateTodoTitleCounter();

				renderTasks(taskListeners);
			}
		});
	});
};

const getActiveFilter = () =>
	[...filterControll].filter((filter: HTMLElement) => filter.dataset.filter === getFilter())[0];

makeFilterActive(getActiveFilter());

initClickFilter();

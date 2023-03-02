import { updateTodoTitle } from '@blocks/todo-title/todo-title.view';
import { updateTodoTitleCounter } from '@blocks/todo-title/__counter/todo-title__counter.view';
import { renderTasks } from '@js/tasks/tasks.view';
import { taskListeners } from '@js/tasks/tasks.controller';
import { getFilter, setFilter } from './filter.model';
import { removeAllActiveClasses, makeFilterActive } from './filter.view';

const filterControll = document.querySelectorAll('.filter__item');

const shouldFilter = (filter) => !filter.classList.contains('filter__item_active');

const initClickFilter = () => {
	filterControll.forEach((currentFilter) => {
		currentFilter.addEventListener('click', (e) => {
			const filter = e.target;
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

const getActiveFilter = () => [...filterControll].filter((filter) => filter.dataset.filter === getFilter())[0];

makeFilterActive(getActiveFilter());

initClickFilter();

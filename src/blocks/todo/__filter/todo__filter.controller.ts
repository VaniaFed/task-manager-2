import { renderTasks, taskListeners } from 'blocks/todo/__task';
import { setFilter, removeAllActiveClasses, makeFilterActive } from 'blocks/todo/__filter';
import { TypeFilter } from 'types/filter';
import { updateTodoTitle } from 'blocks/todo-title';
import { updateTodoTitleCounter } from 'blocks/todo-title/__counter';

const filterControll = document.querySelectorAll('.filter__item');

const shouldFilter = (filter: HTMLElement) => !filter.classList.contains('filter__item_active');

export const initClickFilter = () => {
	filterControll.forEach((currentFilter) => {
		currentFilter.addEventListener('click', (e) => {
			const filterEl = e.target as HTMLElement;
			if (shouldFilter(filterEl)) {
				removeAllActiveClasses(filterControll);
				makeFilterActive(filterEl);

				const filterValue = filterEl.dataset.filter as TypeFilter;
				setFilter(filterValue);

				updateTodoTitle(filterValue);
				updateTodoTitleCounter();

				renderTasks(taskListeners);
			}
		});
	});
};

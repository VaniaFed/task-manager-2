import { getFilter } from '@blocks/todo/__filter/todo__filter.model';

const emptyState = document.querySelector('.empty-state');

const formEmptyState = () => {
	const noTasksImage = document.querySelector('.empty-state__image');
	const noTasksText = document.querySelector('.empty-state__text');

	switch (getFilter()) {
		case 'All': {
			noTasksImage.classList.remove('hidden');
			noTasksText.innerText = 'Как-то пустовато... Добавим новую задачу?';

			break;
		}

		case 'Active': {
			noTasksImage.classList.add('hidden');
			noTasksText.innerText = 'Активных задач пока нет';

			break;
		}

		case 'Completed': {
			noTasksImage.classList.add('hidden');
			noTasksText.innerText = 'Вы еще не закончили ни одну задачу';

			break;
		}

		default:
			break;
	}
};

export const hideEmptyState = () => {
	emptyState.classList.add('hidden');
};

export const showEmptyState = () => {
	emptyState.classList.remove('hidden');
	formEmptyState();
};

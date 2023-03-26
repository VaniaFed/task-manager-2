import { getFilter } from 'blocks/todo/__filter';

export const removeAllActiveClasses = (filters: NodeList) => {
	filters.forEach((filter) => {
		(filter as HTMLElement).classList.remove('filter__item_active');
	});
};

export const makeFilterActive = (filter: HTMLElement) => {
	filter.classList.add('filter__item_active');
};

export const makeFilterActiveAccordingToStore = () => {
	makeFilterActive(getActiveFilter() as HTMLElement);
};

const filterControll = document.querySelectorAll('.filter__item');
export const getActiveFilter = () =>
	[...filterControll].filter((filter) => (filter as HTMLElement).dataset.filter === getFilter())[0];

export const removeAllActiveClasses = (filters: NodeList) => {
	filters.forEach((filter) => {
		(filter as HTMLElement).classList.remove('filter__item_active');
	});
};

export const makeFilterActive = (filter: HTMLElement) => {
	filter.classList.add('filter__item_active');
};

export const removeAllActiveClasses = (filters) => {
	filters.forEach((filter) => {
		filter.classList.remove('filter__item_active');
	});
};

export const makeFilterActive = (filter) => {
	filter.classList.add('filter__item_active');
};

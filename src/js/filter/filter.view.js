export const removeAllActiveClasses = (filters) => {
	filters.forEach((filter) => {
		filter.classList.remove('tab__item_active');
	});
};

export const makeFilterActive = (filter) => {
	filter.classList.add('tab__item_active');
};

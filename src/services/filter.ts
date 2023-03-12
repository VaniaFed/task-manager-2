export const getFilterFromStorage = () => JSON.parse(localStorage.getItem('filter')) || 'All';

export const setFilterToStorage = (newFilter) => {
	localStorage.setItem('filter', JSON.stringify(newFilter));
};

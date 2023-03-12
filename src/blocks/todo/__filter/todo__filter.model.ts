const getFilterFromLocalStorage = () => JSON.parse(localStorage.getItem('filter')) || 'All';

const setFilterToLocalStorage = (newFilter) => {
	localStorage.setItem('filter', JSON.stringify(newFilter));
};

let filter = getFilterFromLocalStorage();

export const getFilter = () => (!filter ? getFilterFromLocalStorage() : filter);

export const setFilter = (newFilter) => {
	filter = newFilter;
	setFilterToLocalStorage(newFilter);
};

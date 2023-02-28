export const getFilter = () => JSON.parse(localStorage.getItem('filter')) || 'All';

export const setFilter = (value) => {
	localStorage.setItem('filter', JSON.stringify(value));
};

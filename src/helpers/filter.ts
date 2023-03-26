import { TypeFilter } from 'types/filter';
export const getFilterFromStorage = (): TypeFilter => JSON.parse(localStorage.getItem('filter')!) || 'All';

export const setFilterToStorage = (newFilter: TypeFilter) => {
	localStorage.setItem('filter', JSON.stringify(newFilter));
};

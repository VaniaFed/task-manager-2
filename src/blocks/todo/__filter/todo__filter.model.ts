import { getFilterFromStorage, setFilterToStorage } from '@services/filter';

let filter = getFilterFromStorage();

export const getFilter = () => (!filter ? getFilterFromStorage() : filter);

export const setFilter = (newFilter) => {
	filter = newFilter;
	setFilterToStorage(newFilter);
};

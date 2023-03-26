import { TypeFilter } from 'types/filter';
import { getFilterFromStorage, setFilterToStorage } from 'helpers/filter';

let filter = getFilterFromStorage();

export const getFilter = (): TypeFilter => (!filter ? getFilterFromStorage() : filter);

export const setFilter = (newFilter: TypeFilter) => {
	filter = newFilter;
	setFilterToStorage(newFilter);
};

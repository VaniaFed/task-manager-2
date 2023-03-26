import { getFilter } from 'blocks/todo/__filter';
import { getTasks, getTasksByStatus } from 'blocks/todo/__task';

const isNoTasks = () => getTasks().length === 0 && getFilter() === 'All';
const isNoActiveTasks = () => getTasksByStatus('Active').length === 0 && getFilter() === 'Active';
const isNoCompletedTasks = () => getTasksByStatus('Completed').length === 0 && getFilter() === 'Completed';

export const shouldShowEmptyState = () => isNoTasks() || isNoActiveTasks() || isNoCompletedTasks();

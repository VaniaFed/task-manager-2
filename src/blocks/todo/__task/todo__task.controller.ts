import {
	addTask,
	createTask,
	removeTaskById,
	setActive,
	setCompleted,
	appendTaskToDOM,
	markTaskAsActive,
	markTaskAsCompleted,
	removeTaskFromDOM,
} from 'blocks/todo/__task';
import { getFilter } from 'blocks/todo/__filter';
import { updateFilterCounter } from 'blocks/filter/__counter';
import { updateTodoTitleCounter } from 'blocks/todo-title/__counter';
import { updateClearCompletedVisibility } from 'blocks/clear-completed';
import { clearInput } from 'blocks/todo/__input';
import { shouldShowEmptyState, hideEmptyState, showEmptyState } from 'blocks/todo/__empty-state';

const input = document.querySelector('.input') as HTMLInputElement;

export const removeTaskListener = (element: HTMLElement) => {
	element.addEventListener('click', ({ target }) => {
		const { id } = ((target as HTMLElement).closest('.todo-task') as HTMLElement).dataset;

		removeTaskById(id);
		removeTaskFromDOM(id);
		updateTodoTitleCounter();
		updateFilterCounter();
		updateClearCompletedVisibility();

		if (shouldShowEmptyState()) {
			showEmptyState();
		}

		input.focus();
	});
};

export const pressTaskListener = (task: HTMLElement) => {
	task.addEventListener('click', ({ target }) => {
		if (!(target as HTMLElement).classList.contains('todo-task__remove-btn')) {
			const { id } = task.dataset;
			if (!task.classList.contains('todo-task_completed')) {
				setCompleted(id);
				markTaskAsCompleted(task);
			} else {
				setActive(id);
				markTaskAsActive(task);
			}

			updateFilterCounter();
			updateClearCompletedVisibility();

			if (getFilter() !== 'All') {
				removeTaskFromDOM(id);
				updateTodoTitleCounter();
			}

			if (shouldShowEmptyState()) {
				showEmptyState();
			}
		}
	});
};

export const initPressTask = () => {
	const tasks = document.querySelectorAll('.todo-task');
	tasks.forEach((task) => pressTaskListener(task as HTMLElement));
};

export const taskListeners = [removeTaskListener, pressTaskListener];

export const handleAddTask = (e: KeyboardEvent | MouseEvent | FocusEvent) => {
	if ((e as KeyboardEvent).key === 'Enter' || e.type === 'blur') {
		const taskText = (e.target as HTMLInputElement).value;
		if (taskText) {
			const newTask = createTask(taskText);
			addTask(newTask);

			if (getFilter() === 'Active' || getFilter() === 'All') {
				appendTaskToDOM(newTask, taskListeners);

				if (!shouldShowEmptyState()) {
					hideEmptyState();
				}
			}

			updateTodoTitleCounter();
			updateFilterCounter();
		}

		clearInput();
	}
};

import { removeTaskListener } from 'blocks/todo/__task';

export const initRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.todo-task__remove-btn');
	removeBtns.forEach((btn) => {
		removeTaskListener(btn as HTMLButtonElement);
	});
};

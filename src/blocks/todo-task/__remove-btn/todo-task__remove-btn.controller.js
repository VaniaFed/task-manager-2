import { removeTaskListener } from '@blocks/todo/__task/todo__task.controller';

const initRemoveTask = () => {
	const removeBtns = document.querySelectorAll('.todo-task__remove-btn');
	removeBtns.forEach((btn) => {
		removeTaskListener(btn);
	});
};

initRemoveTask();

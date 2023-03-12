import { hideClearInputIcon, showClearInputIcon } from '../__input-wrapper/__icon/todo__input-wrapper__icon.view';
import { handleAddTask } from '../__task/todo__task.controller';

const input = document.querySelector('.input') as HTMLInputElement;

export const clearInput = () => {
	input.value = '';
};

input.addEventListener('focus', () => {
	showClearInputIcon();
});

input.addEventListener('blur', () => {
	hideClearInputIcon();
});

export const initAddTaskOnEnter = () => {
	input.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			handleAddTask(e);
		}
	});
};

const initAddTaskOnFocusOut = () => {
	input.addEventListener('blur', (e) => {
		handleAddTask(e);
	});
};

input.addEventListener('keydown', (e) => {
	console.log(e.key);
	if (e.key === 'Escape' || e.key === 'Tab') {
		input.value = '';
		input.blur();
	}
});

document.addEventListener('keypress', () => {
	input.focus();
});

input.focus();

initAddTaskOnEnter();
initAddTaskOnFocusOut();

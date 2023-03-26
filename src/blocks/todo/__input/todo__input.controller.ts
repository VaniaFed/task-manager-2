import { handleAddTask } from 'blocks/todo/__task';
import { hideClearInputIcon, showClearInputIcon } from 'blocks/todo/__input-wrapper/__icon';

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

export const initAddTaskOnFocusOut = () => {
	input.addEventListener('blur', (e) => {
		handleAddTask(e);
	});
};

input.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' || e.key === 'Tab') {
		input.value = '';
		input.blur();
	}
});

document.addEventListener('keypress', () => {
	input.focus();
});

input.focus();

import { hideClearInputIcon } from './todo__input-wrapper__icon.view';

const input = document.querySelector('.input') as HTMLInputElement;
const clearInputIcon = document.querySelector('.todo__input-wrapper__icon')!;

export const clearInputListener = () => {
	clearInputIcon.addEventListener('mousedown', (e) => {
		e.preventDefault();
		input.value = '';
		hideClearInputIcon();
	});
};

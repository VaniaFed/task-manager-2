const input = document.querySelector('.input') as HTMLInputElement;
const clearInputIcon = document.querySelector('.todo__input-wrapper__icon')!;

export const clearInputListener = () => {
	clearInputIcon.addEventListener('mousedown', () => {
		input.value = '';
	});
};

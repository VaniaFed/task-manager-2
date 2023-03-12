const input = document.querySelector('.input') as HTMLInputElement;
const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');

clearInputIcon.addEventListener('mousedown', () => {
	input.value = '';
});

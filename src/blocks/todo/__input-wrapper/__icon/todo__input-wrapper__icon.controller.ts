const input = document.querySelector('.input');
const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');

clearInputIcon.addEventListener('mousedown', () => {
	input.value = '';
});

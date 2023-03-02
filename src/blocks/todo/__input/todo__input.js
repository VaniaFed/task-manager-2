const input = document.querySelector('.input');
const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');

export const clearInput = () => {
	input.value = '';
};

input.addEventListener('focus', () => {
	clearInputIcon.classList.add('todo__input-wrapper_icon_shown');
});

input.addEventListener('blur', () => {
	clearInputIcon.classList.remove('todo__input-wrapper_icon_shown');
});

input.focus();

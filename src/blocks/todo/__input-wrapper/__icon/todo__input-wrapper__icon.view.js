const clearInputIcon = document.querySelector('.todo__input-wrapper__icon');

export const showClearInputIcon = () => {
	clearInputIcon.classList.add('todo__input-wrapper_icon_shown');
};

export const hideClearInputIcon = () => {
	clearInputIcon.classList.remove('todo__input-wrapper_icon_shown');
};

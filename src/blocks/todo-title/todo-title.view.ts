const todoTitle = document.querySelector('.todo-title').childNodes[0];

export const updateTodoTitle = (filter) => {
	switch (filter) {
		case 'All':
			todoTitle.textContent = 'Все задачи';
			break;

		case 'Active':
			todoTitle.textContent = 'Активные';
			break;

		case 'Completed':
			todoTitle.textContent = 'Завершенные';
			break;

		default:
			break;
	}
};

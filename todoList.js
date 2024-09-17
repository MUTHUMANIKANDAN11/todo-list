const todoList = JSON.parse(localStorage.getItem('list')) || []

setTodoList();

function setTodoList(){
    let todoListHtml = '';

    todoList.forEach((todoObject, index) => {
        const name = todoObject.name;
        const duedate = todoObject.duedate;

        let nameHtml = `
            <div>${name}</div>
            <div>${duedate}</div>
            <button class="delete-btn js-delete-btn">Delete</button>
        `;
        
        todoListHtml += nameHtml;
    });

    document.querySelector('.js-todo-list').innerHTML = todoListHtml;

    document.querySelectorAll('.js-delete-btn').forEach((value, index) => {
        value.addEventListener('click', () => {
            deleteList(index);
            setTodoList();
        });
    });
}

document.querySelector('.js-add-btn').addEventListener('click', () => {
    addNames();
});

function addNames(){
    let inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    let dateInput = document.querySelector('.js-date-input');
    const duedate = dateInput.value;

    if(!name || !duedate){
        return;
    }
    
    todoList.push({
        name: name,
        duedate: duedate
    });

    inputElement.value = '';
    dateInput.value = '';
    
    setTodoList();
    localStorage.setItem('list', JSON.stringify(todoList));
}

function deleteList(index){
    todoList.splice(index,1);
    setTodoList();
    localStorage.setItem('list', JSON.stringify(todoList));
}
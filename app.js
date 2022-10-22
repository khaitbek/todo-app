const todoList = document.querySelector("#todoList")
const todoForm = document.querySelector("#todoForm")
const userTodoInput = document.querySelector("#userTodoInput")
const todos = []
const savedTodos = []
todoForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const userTodoText = userTodoInput.value
    addTodo(userTodoText)
    todoForm.reset()
})

function addTodo(todo) {
    const todoObj = {
        title: todo,
        completed: false,
        id: Math.round(Math.random() * 10000000)
    }
    todos.push(todoObj)
    renderTodos(todos)
}

function renderTodos(todos) {
    todoList.innerHTML = ""
    todos.forEach((todo,index) => {
        const todoTemplate = document.querySelector("[data-todo]").content.cloneNode(true).children[0]
        const todoTitle = todoTemplate.querySelector("#todoTitle")
        const saveTodoBtn = todoTemplate.querySelector("#saveTodo")
        const deleteTodoBtn = todoTemplate.querySelector("#deleteTodo")
        const checkTodo = todoTemplate.querySelector("#checkTodo")
        
        
        todoTitle.textContent = todo.title
        saveTodoBtn.dataset.id = index
        deleteTodoBtn.dataset.id = index
        checkTodo.dataset.id = index

        todoList.append(todoTemplate)
    })
}

todoList.addEventListener("click", (evt) => {
    if (evt.target.matches("#saveTodo")) {
        const filteredTodo = todos[evt.target.dataset.id]
        saveTodos(filteredTodo)
    }
    else if (evt.target.matches("#deleteTodo")) {
        // const filteredTodos = 
        todos.splice(Number(evt.target.dataset.id),1)
        renderTodos(todos)
    }else if(evt.target.matches("#checkTodo")){
        todos[Number(evt.target.dataset.id)].completed = !todos[Number(evt.target.dataset.id)].completed
        const parentItem = evt.target.closest("#todoItem");
        parentItem.classList.toggle("completed")
        console.log(todos[Number(evt.target.dataset.id)].completed);
    }
})


function saveTodos(todo) {
    savedTodos.push(todo)
    localStorage.setItem("saved_todos", JSON.stringify(savedTodos))
}
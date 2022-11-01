// selectors
const todoList = document.querySelector("#todoList")
const todoForm = document.querySelector("#todoForm")
const userTodoInput = document.querySelector("#userTodoInput")
const editDialog = document.querySelector("#editDialog")
const editForm = document.querySelector("#editForm")
const editInput = document.querySelector("#editInput")
const editBtn = document.querySelector("#editBtn")
const categoryBtns = document.querySelectorAll("[data-category]")
const todos = JSON.parse(localStorage.getItem("todos")) || []
const savedTodos = []

updateCounts()
renderTodos(todos)

// events

todoForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const userTodoText = userTodoInput.value
    todoForm.reset()
    addTodo(userTodoText)
    updateCounts()
})

todoList.addEventListener("click", (evt) => {
    if (evt.target.matches("#saveTodo")) {
        const filteredTodo = todos[evt.target.dataset.id]
        return saveTodos(filteredTodo)
    }
    if (evt.target.matches("#deleteTodo")) {
        todos.splice(Number(evt.target.dataset.id), 1)
        updateCounts()
        return renderTodos(todos)
    }if (evt.target.matches("#checkTodo")) {
        todos[Number(evt.target.dataset.id)].completed = !todos[Number(evt.target.dataset.id)].completed
        // const parentItem = evt.target.closest("#todoItem");
        // parentItem.classList.toggle("completed")
        renderTodos(todos)
        updateCounts()
        return
    }if (evt.target.matches("#editTodo")) {
        editDialog.dataset.id = evt.target.dataset.id
        editDialog.showModal()
    }
})

editForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    editTodo(editInput.value)
    renderTodos(todos)
    editDialog.close()
    editForm.reset()
})

categoryBtns.forEach(categoryBtn => {
    categoryBtn.addEventListener("click",()=>{
        const btnCategory = categoryBtn.dataset.category;
        if(btnCategory === "completed") return renderTodos(todos.filter(todo => todo.completed));
        if(btnCategory === "uncompleted") return renderTodos(todos.filter(todo => !todo.completed));
        renderTodos(todos)
    })
})

// functions

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
    todos.forEach((todo, index) => {
        const todoTemplate = document.querySelector("[data-todo]").content.cloneNode(true).children[0]
        const todoTitle = todoTemplate.querySelector("#todoTitle")
        const saveTodoBtn = todoTemplate.querySelector("#saveTodo")
        const deleteTodoBtn = todoTemplate.querySelector("#deleteTodo")
        const checkTodo = todoTemplate.querySelector("#checkTodo")
        const editTodo = todoTemplate.querySelector("#editTodo")

        if(todo.completed){
            todoTemplate.classList.add("completed")
            checkTodo.checked = true
        } 
        todoTitle.textContent = todo.title
        saveTodoBtn.dataset.id = index
        deleteTodoBtn.dataset.id = index
        checkTodo.dataset.id = index
        editTodo.dataset.id = index

        todoList.append(todoTemplate)
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}

function editTodo(editText){
    todos[Number(editDialog.dataset.id)].title = editText
}

function saveTodos(todo) {
    savedTodos.push(todo)
    localStorage.setItem("saved_todos", JSON.stringify(savedTodos))
}

function updateCounts(){
    categoryBtns.forEach(categoryBtn => {
        if(categoryBtn.dataset.category === "all") return categoryBtn.appendChild(createBadgeCounter(todos.length));
        if(categoryBtn.dataset.category === "completed") return categoryBtn.appendChild(createBadgeCounter(todos.filter(todo => todo.completed).length)); 
        return categoryBtn.appendChild(createBadgeCounter(todos.filter(todo => !todo.completed).length)); 
    })
}

function createBadgeCounter(count){
    const badgeCounter = document.createElement("span")
    badgeCounter.className = "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
    badgeCounter.textContent = count
    return badgeCounter
}
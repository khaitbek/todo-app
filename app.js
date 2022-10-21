const todoList = document.querySelector("#todoList")
const todoForm = document.querySelector("#todoForm")
const userTodoInput = document.querySelector("#userTodoInput")
const todos = []
const savedTodos = []
todoForm.addEventListener("submit",(evt)=>{
    evt.preventDefault()
    const userTodoText = userTodoInput.value
    addTodo(userTodoText)
    todoForm.reset()
})

function addTodo(todo){
    const todoTemplate = document.querySelector("[data-todo]").content.cloneNode(true).children[0]
    const todoTitle = todoTemplate.querySelector("#todoTitle")
    todoTitle.textContent = todo
    todos.push({
        title:todo,
        completed:false
    })
    todoList.append(todoTemplate)
}

todoList.addEventListener("click",(evt)=>{
    if(evt.target.matches("#saveTodo")){
        
    }
})
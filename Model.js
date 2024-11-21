class Model {
    constructor() {
        // The state of the model
        //this.game = JSON.parse(localStorage.getItem('savedGame')) || new Game();
        //this.world = new World();
    }

    addUser() {
        const newUser = new User();

        this.users.push(newUser)
    }

    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }



    // // Map through all todos, and replace the text of the todo with the specified id
    // editTodo(id, updatedText) {
    //     this.todos = this.todos.map((todo) =>
    //         todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo,
    //     )
    // }

    // // Filter a todo out of the array by id
    // deleteTodo(id) {
    //     this.todos = this.todos.filter((todo) => todo.id !== id)
    // }

    // // Flip the complete boolean on the specified todo
    // toggleTodo(id) {
    //     this.todos = this.todos.map((todo) =>
    //         todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo,
    //     )
    // }
}
const ModelState = {
    MORNING:0,
    AFTERNOON:1,
    NIGHT:2
}


class Model {
    constructor() {
        // The state of the model
        //this.game = JSON.parse(localStorage.getItem('savedGame')) || new Game();
        this.world = new World();
        this.users = [new User()];
        this.state = ModelState.MORNING;
    }

    addUser() {
        const newUser = new User();

        this.users.push(newUser)
    }

    

    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    // Only mutates the state, no return value for affordability check
    attemptShopPurchase(value, user) {
        if(!user.hasRoomForThisCard(this.world.shop.onDisplay[value])){
            console.log("Oops no more room for more cards")
        }
        else if (this.world.shop.isPurchaseAffordable(value, user)) {
            const buyingCard = this.world.shop.getPurchase(value, user);
        
            
            
            if (buyingCard) {
                this.users[0].addCard(buyingCard, this.world.league.lookup(buyingCard.leagueIdNumber));
            }
        }
    }




    next(){
        this.state = ( this.state + 1 ) % Object.keys(ModelState).length;
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
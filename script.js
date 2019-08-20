// REQUIREMENTS (V11)

// todoList.toggleAll should use forEach
// view.displayTodos should use forEach

var todoList = {
    //stores todos array on an object
    todos: [],
    //provides addTodo method
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    //provides changeTodo method
    changeTodo: function(position, todoText) {
        //changeTodo method must change todoText property
        this.todos[position].todoText = todoText;
    },
    //provides deleteTodo method
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    //provides toggleCompleted method
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        //todoList.toggleCompleted changes the completed property
        todo.completed = !todo.completed;
    },
    //provides toggleAll method
    toggleAll: function() {
        var totalTodos = this.todos.length;
        //Get number of completedTodos
        var completedTodos = 0;
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function(todo) {
            // If everything's true,
            if (completedTodos === totalTodos) {
                // Make everything false.
                todo.completed = false;
            } else {
                // Otherwise, make everything true
                todo.completed = true;
            }
        });
    }
};
// Creates a 'handlers' method for all buttons/events in the HTML file 
var handlers = {
    // addTodo button handler
    addTodo: function() {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    // changeTodo button handler
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    // Updated deleteTodo button handler
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    // toggleCompleted button handler
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    // toggleAll button handler
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};
var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        // There should be an li element for every todo
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';

            // Each li element should show .completed
            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            // Each li should have an id that has the todo position
            todoLi.id = position;
            // Each li element should contain .todoText
            todoLi.textContent = todoTextWithCompletion;
            // There should be a delete button for each todo
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    // There should be a way to create delete buttons
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        // Delete buttons should have access to the todo id
        todosUl.addEventListener('click', function(event) {

            // Get element that was clicked on
            var elementClicked = event.target;
            // Check if clicked element is a delete button
            if (elementClicked.className === 'deleteButton') {
                // Clicking delete should update todoList.todos and the DOM
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};
view.setUpEventListeners();
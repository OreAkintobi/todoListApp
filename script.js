// REQUIREMENTS (V12)

// there should be a way to create changeTodo buttons
// there should be a changeTodo button for each todo
// each li should have an id that has the todo position
// changeTodo buttons should have access to the todo id
// clicking change should update todoList.todos and the DOM

var todoList = {
  //stores todos array on an object
  todos: [],
  //provides addTodo method
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      dateCreated: new Date().toDateString(),
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
  },
  // provides searchTodo method
  searchTodos: function(searchValue) {
    let searchResults = this.todos.filter(todo =>
      todo.todoText.startsWith(searchValue)
    );
    view.displayTodos(searchResults);
  }
};
// Creates a 'handlers' method for all buttons/events in the HTML file
var handlers = {
  // addTodo input handler
  addTodoTextInput: document.getElementById("addTodoTextInput"),
  addTodoOnInput: addTodoTextInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      handlers.addTodo();
    }
  }),
  // addTodo button handler
  addTodo: function() {
    if (addTodoTextInput.value.trim() === "") {
      alert("Please Enter a Todo.");
    } else {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = "";
      view.displayTodos(todoList.todos);
    }
  },
  // changeTodo input handler
  changeTodo: function() {
    var changeTodoPositionInput = event.target.parentNode.id;
    todoList.changeTodo(changeTodoPositionInput, event.target.value);
    view.displayTodos(todoList.todos);
  },
  // Updated deleteTodo button handler
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos(todoList.todos);
  },
  // toggleCompleted button handler
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById(
      "toggleCompletedPositionInput"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  // toggleAll button handler
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos(todoList.todos);
  }
};
var view = {
  displayTodos: function(todoArray) {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    // There should be an li element for every todo
    todoArray.forEach(function(todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";
      var todoDate = document.createElement("small");
      var italics = document.createElement("i");

      // Each li element should show .completed
      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }

      // Each li should have an id that has the todo position
      todoLi.id = position;
      // Each li element should contain .todoText
      todoLi.textContent = todoTextWithCompletion;
      todoDate.textContent = "  added " + todo.dateCreated;

      // There should be a change button for each todo
      todoLi.appendChild(this.createChangeInput());
      // There should be a delete button for each todo
      todoLi.appendChild(this.createDeleteButton());
      italics.appendChild(todoDate);
      todoLi.appendChild(italics);
      todosUl.appendChild(todoLi);
    }, this);
  },
  // There should be a way to create delete buttons
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "deleteButton";
    // deleteButton.className += "btn btn-outline-dark btn-sm";
    return deleteButton;
  },
  // There should be a way to create change Todo button and input
  createChangeInput: function() {
    var changeInput = document.createElement("input");
    // Change buttons (Enter/Return) should have access to the todo id
    changeInput.addEventListener("keyup", function(event) {
      // Check if Enter/Return button was pressed
      if (event.keyCode === 13) {
        // Pressing Enter/Return should update todoList.todos and the DOM
        handlers.changeTodo();
      }
    });
    changeInput.type = "text";
    changeInput.className = "changeButtonInput";
    changeInput.placeholder = "Change Todo";
    return changeInput;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");
    let todoSearch = document.querySelector("#todo-filter");

    todoSearch.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        todoList.searchTodos(todoSearch.value);
      }
    });

    // Delete buttons should have access to the todo id
    todosUl.addEventListener("click", function(event) {
      // Get element that was clicked on
      var elementClicked = event.target;
      // Check if clicked element is a delete button
      if (elementClicked.className === "deleteButton") {
        // Clicking delete should update todoList.todos and the DOM
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};
view.setUpEventListeners();

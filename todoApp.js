// REQUIREMENTS (V14)

// there should be a way to toggle todos completed or not completed without the toggle completed input and button

var todoList = {
  //stores todos array on an object

  todos: (data = JSON.parse(localStorage.getItem("todos"))) || [],

  //provides addTodo method
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      dateCreated: new Date().toDateString(),
      completed: false
    });
    localStorage.setItem("todos", JSON.stringify(this.todos));
  },
  //provides changeTodo method
  changeTodo: function(position, todoText) {
    //changeTodo method must change todoText property
    data[position].todoText = todoText;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  },
  //provides deleteTodo method
  deleteTodo: function(position) {
    data.splice(position, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  },
  //provides toggleCompleted method
  toggleCompleted: function(position) {
    //todoList.toggleCompleted changes the completed property
    this.todos[position].completed = !this.todos[position].completed;
    localStorage.setItem("todos", JSON.stringify(this.todos));
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
    localStorage.setItem("todos", JSON.stringify(this.todos));
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
    view.displayTodos(todoList.todos);
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
    // runs event listener on Search Input
    todoSearch.addEventListener("keyup", function(event) {
      // if (event.keyCode === 13) {
      todoList.searchTodos(todoSearch.value);
      // }
    });

    // addTodo input handler
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    addTodoTextInput.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        handlers.addTodo();
      }
    });

    // Delete buttons should have access to the todo id
    todosUl.addEventListener("click", function(event) {
      // Get element that was clicked on
      var elementClicked = event.target;

      var todoListItem = document.querySelector("li");
      // Check if clicked element is a delete button
      if (elementClicked.className === "deleteButton") {
        // Clicking delete should update todoList.todos and the DOM
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      if (elementClicked === todoListItem) {
        console.log(todoListItem.parentNode.id);
      }
    });
  }
};
view.displayTodos(todoList.todos);
view.setUpEventListeners();

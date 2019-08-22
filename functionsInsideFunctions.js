// It is possible in JS to have or create functions that enhance or manipulate other functions.
// For example, the 'debugger' command can be made into a function.
// Passing other functions into said debugger function will trigger a debug of the argument function.

function debugFunction(anyFunction) { //This is our debugger function
    debugger;
    anyFunction();
};

function multiplesOfTwo(number) { //Example function
    for (i = 2; i < number; i = i + 2) {
        console.log(i);
    };
};

debugFunction(multiplesOfTwo);

// setTimeOut can turn other functions into alarm clocks by attaching a timer to the execution of its argument function.

setTimeout(debugFunction(multiplesOfTwo), 5000); // After 5 seconds (5000 milliseconds, debugFunction will run)

// If you want to run a function on every item in an array, you can use the forEach method.

var students = ['bobo', 'mimi', 'yoyo'];

function logName(name) {
    console.log(name);
};

// Instead of passing in each array item individually or using a for loop, you can do something easier.

students.forEach(logName);

// If we were to build our own forEach function, here's what it would look like:

function forEach(myArray, myFunction) {
    for (var i = 0; i < myArray.length; i++) {
        myFunction(myArray[i]);
    }
};

// The addEventListener method also acts to listen to when an element is acted upon and run a function when that happens.

var paragraph = document.getElementById('paragraph');
paragraph.addEventListener('click', function() {
    console.log('This item was clicked!');
});

// HIGHER ORDER FUNCTIONS: Functions that accept other functions
// (eg. runWithDebugger/debugFunction, setTimeOut, forEach)
// They accepted other functions and enhanced the behavior of these functions

// CALLBACK FUNCTIONS: Functions that are passed into higher order functions
// (eg. in our runWithDebugger/debugFunction example, the parameter/argument function IS the callback function)

// THE RETURN STATEMENT: If you don't return a value at the end of a function, it will by default return 'undefined'.

function multiplyTwoNumbers(a, b) {
    var result = a * b;
    return result; // IMPORTANT
};

var theProductOf2And10 = multiplyTwoNumbers(2, 10);

// Use 'classes' (.class) to identify elements when these elements are not unique.
// Use class when you want to manage a bunch of similar elements at the same time.


// NB: The forEach function can render most for loops you have to write redundant.
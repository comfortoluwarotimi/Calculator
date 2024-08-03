// Get the element that displays the previous operand (number)
const previousOperand = document.querySelector(".previous-operand");

// Get the element that displays the current operand (number)
const currentOperand = document.querySelector(".current-operand");

// Get the delete button element
const deleteBtn = document.querySelector(".delete-btn");

// Get the reset button element
const resetBtn = document.querySelector(".reset-btn");

// Get the button element that shows the result (equals button)
const outputBtn = document.querySelector(".output-btn");

// Get all the number button elements
const numBtns = document.querySelectorAll(".num-btn");

// Get all the operator button elements (+, -, x, /)
const operators = document.querySelectorAll(".operator-btn");

// Initialize variables for previous operand, current operand, and operation
let prevOperand = previousOperand.innerText;
let currOperand = currentOperand.innerText;
let operation;

// Get the theme buttons by their IDs
let theme1 = document.getElementById("theme1");
let theme2 = document.getElementById("theme2");
let theme3 = document.getElementById("theme3");

// Add event listeners for changing themes
theme1.addEventListener("click", () => {
  // Remove theme2 and theme3 classes when theme1 button is clicked
  document.documentElement.classList.remove("theme2");
  document.documentElement.classList.remove("theme3");
});

theme2.addEventListener("click", () => {
  // Remove theme1 and theme3 classes and toggle theme2 class when theme2 button is clicked
  document.documentElement.classList.remove("theme1");
  document.documentElement.classList.remove("theme3");
  document.documentElement.classList.toggle("theme2");
});

theme3.addEventListener("click", () => {
  // Remove theme1 and theme2 classes and toggle theme3 class when theme3 button is clicked
  document.documentElement.classList.remove("theme1");
  document.documentElement.classList.remove("theme2");
  document.documentElement.classList.toggle("theme3");
});

// Function to reset the calculator
function reset() {
  prevOperand = ""; // Clear previous operand
  currOperand = ""; // Clear current operand
  operation = undefined; // Clear operation
}

// Function to delete the last digit of the current operand
function deleteOperand() {
  currOperand = currOperand.toString().slice(0, -1);
}

// Function to add a number to the current operand
function addNumber(number) {
  // If the number is a decimal point and the current operand already has one, do nothing
  if (number == "." && currOperand.includes(".")) return;
  // If the current operand length is less than 10, add the number to it
  if (currOperand.length < 10) {
    currOperand = currOperand.toString() + number.toString();
  }
}

// Function to select an operation (+, -, x, /)
function operationSelection(operate) {
  // If no operation is provided, do nothing
  if (operate == "") return;
  // If an operation is provided, calculate the result of the previous operation
  if (operate !== "") {
    calculatorOperation();
  }
  operation = operate; // Set the operation
  prevOperand = currOperand; // Set previous operand to current operand
  currOperand = ""; // Clear current operand
}

// Function to calculate the result based on the operation
function calculatorOperation() {
  let result;
  let prev = parseFloat(prevOperand); // Convert previous operand to a number
  let current = parseFloat(currOperand); // Convert current operand to a number

  // Perform the calculation based on the operation
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  // If the result is a decimal and has more than 2 decimal places, round it to 2 decimal places
  if (result % 1 !== 0 && result.toString().split(".")[1].length > 2) {
    currOperand = parseFloat(result.toFixed(2));
  } else {
    currOperand = result;
  }

  operation = undefined; // Clear operation
  prevOperand = ""; // Clear previous operand
  previousOperand.innerHTML = ""; // Clear previous operand display
}

// Function to display the current and previous operands
function displayNum() {
  currentOperand.innerHTML = currOperand.toString(); // Display current operand
  // If an operation is selected, display the previous operand and operation
  if (operation !== undefined) {
    previousOperand.innerHTML = `${prevOperand} ${operation}`;
  } else {
    previousOperand.innerHTML = prevOperand; // Otherwise, just display the previous operand
  }
}

// Add event listeners to each number button
numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addNumber(btn.innerHTML); // Add number to current operand when button is clicked
    displayNum(); // Display the updated numbers
  });
});

// Add event listeners to each operator button
operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerHTML); // Select operation when button is clicked
    displayNum(); // Display the updated numbers
  });
});

// Add event listener to the equals button
outputBtn.addEventListener("click", () => {
  calculatorOperation(); // Calculate the result when button is clicked
  displayNum(); // Display the result
});

// Add event listener to the delete button
deleteBtn.addEventListener("click", () => {
  deleteOperand(); // Delete the last digit of the current operand when button is clicked
  displayNum(); // Display the updated numbers
});

// Add event listener to the reset button
resetBtn.addEventListener("click", () => {
  reset(); // Reset the calculator when button is clicked
  displayNum(); // Display the cleared numbers
});

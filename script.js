// Get the display element
const display = document.getElementById('display');

// Initialize the calculator state
let currentNumber = '';
let previousNumber = '';
let operator = '';
let memory = 0;

// Add event listeners to buttons
document.querySelectorAll('.button-grid button').forEach(button => {
    button.addEventListener('click', handleButtonPress);
});

// Handle button press
function handleButtonPress(event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case 'ac':
            clearCalculator();
            break;
        case 'od':
            performOperation('%');
            break;
        case 'quare':
            performOperation('^ 2');
            break;
        case 'divide':
            performOperation('/');
            break;
        case 'multiply':
            performOperation('*');
            break;
        case 'minus':
            performOperation('-');
            break;
        case 'add':
            performOperation('+');
            break;
        case 'equal':
            performEqual();
            break;
        case 'c':
            clearMemory();
            break;
        case 'mr':
            recallMemory();
            break;
        case '+':
            addMemory();
            break;
        case '-':
            subtractMemory();
            break;
        case 'qrt':
            performOperation('sqrt');
            break;
        case 'in':
            performOperation('sin');
            break;
        case 'cos':
            performOperation('cos');
            break;
        case 'tan':
            performOperation('tan');
            break;
        default:
            // Number buttons
            if (operator === '') {
                currentNumber += buttonId;
                display.value = currentNumber;
            } else {
                currentNumber += buttonId;
                display.value = previousNumber + operator + currentNumber;
            }
    }
}

// Perform operation
function performOperation(operatorSymbol) {
    previousNumber = currentNumber;
    currentNumber = '';
    operator = operatorSymbol;
    display.value = previousNumber + ' '+operator;
}

// Perform equal operation
function performEqual() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        case '%':
            result = parseFloat(previousNumber) % parseFloat(currentNumber);
            break;
        case '^ 2':
            result = Math.pow(parseFloat(previousNumber), 2);
            break;
        case 'sqrt':
            result = Math.sqrt(parseFloat(previousNumber));
            break;
        case 'sin':
            result = Math.sin(parseFloat(previousNumber) * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(parseFloat(previousNumber) * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(parseFloat(previousNumber) * Math.PI / 180);
            break;
        default:
            result = 'Error';
    }
    display.value = result;
    currentNumber = result.toString();
    previousNumber = '';
    operator = '';
}

// Clear calculator
function clearCalculator() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    display.value = '';
}

// Clear memory
function clearMemory() {
    if (currentNumber.endsWith('+') || currentNumber.endsWith('-') || currentNumber.endsWith('*') || currentNumber.endsWith('/')) {
      // If the last character is an operator, remove it and set operator to empty string
      currentNumber = currentNumber.slice(0, -1);
      operatorSymbol = '';
    } else {
      // If the last character is a number, remove it
      currentNumber = currentNumber.slice(0, -1);
    }
    display.value = currentNumber;
  }
// Recall memory
function recallMemory() {
    currentNumber = memory.toString();
    display.value = currentNumber;
}

// Add to memory
function addMemory() {
    memory += parseFloat(currentNumber);
    currentNumber = '';
    display.value = '';
}

// Subtract from memory
function subtractMemory() {
    memory -= parseFloat(currentNumber);
    currentNumber = '';
    display.value = '';
}

// Add decimal point
document.getElementById('decimal').addEventListener('click', () => {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        display.value = previousNumber + operator  + currentNumber;
    }
});
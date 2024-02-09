const display = document.getElementById('display');
let currentNumber = '';
let storedNumber = '';
let operation = null;
let displayMode = 'deg';
let history = [];

// Event listeners for keypress events
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9\.]/.test(key)) {
        setInput(key);
    } else if (/\+|-|\*|\//.test(key)) {
        setOperator(key);
    } else if (key === '=' || key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

function setInput(value) {
    if (value === '.' && currentNumber.includes('.')) return;
    currentNumber += value;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentNumber;
}

function clearDisplay() {
    currentNumber = '';
    storedNumber = '';
    operation = null;
    updateDisplay();
}

function setOperator(op) {
    if (currentNumber === '') return;
    if (storedNumber !== '') calculateResult();
    operation = op;
    storedNumber = currentNumber;
    currentNumber = '';
}

function switchDisplayMode(modeButton) {
    displayMode = modeButton.id === 'degBtn' ? 'deg' : 'rad';
    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach(button => button.classList.remove('selected'));
    modeButton.classList.add('selected');
}

function calculateResult() {
    if (operation === null || storedNumber === '' || currentNumber === '') return;

    let result;

    if (displayMode === 'deg') {
        const num1 = parseFloat(storedNumber);
        const num2 = parseFloat(currentNumber);

        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }
    } else {
        const rad1 = (parseFloat(storedNumber) * Math.PI) / 180;
        const rad2 = (parseFloat(currentNumber) * Math.PI) / 180;

        switch (operation) {
            case '+':
                result = (rad1 + rad2) * (180 / Math.PI);
                break;
            case '-':
                result = (rad1 - rad2) * (180 / Math.PI);
                break;
            case '*':
                result = (rad1 * rad2) * (180 / Math.PI);
                break;
            case '/':
                result = (rad1 / rad2) * (180 / Math.PI);
                break;
        }
    }

    currentNumber = result.toString();
    storedNumber = '';
    operation = null;
    updateDisplay();

    // Store the calculation in the history
    storeCalculation(`${storedNumber} ${operation} ${currentNumber} = ${currentNumber}`);
}

function storeCalculation(calculation) {
    history.push(calculation);
    if (history.length > 10) history.shift();
}

function showHistory() {
    alert(history.join('\n'));
}
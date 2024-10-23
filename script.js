let currentInput = '0';
let previousInput = '';
let operator = '';
let memory = 0;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function handleNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function handleOperator(op) {
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Error';
            break;
        case '%':
            result = prev * (curr / 100);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function handleMemory(action) {
    if (action === 'M+') {
        memory += parseFloat(currentInput);
    } else if (action === 'M-') {
        memory -= parseFloat(currentInput);
    } else if (action === 'MR') {
        currentInput = memory.toString();
        updateDisplay();
    } else if (action === 'MC') {
        memory = 0;
    }
}

document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('decimal').addEventListener('click', handleDecimal);
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('add').addEventListener('click', () => handleOperator('+'));
document.getElementById('subtract').addEventListener('click', () => handleOperator('-'));
document.getElementById('multiply').addEventListener('click', () => handleOperator('*'));
document.getElementById('divide').addEventListener('click', () => handleOperator('/'));
document.getElementById('percent').addEventListener('click', () => handleOperator('%'));

document.getElementById('memory-recall').addEventListener('click', () => handleMemory('MR'));
document.getElementById('memory-clear').addEventListener('click', () => handleMemory('MC'));

document.querySelectorAll('.btn').forEach(button => {
    if (button.id.match(/[0-9]/)) {
        button.addEventListener('click', () => handleNumber(button.innerText));
    }
});

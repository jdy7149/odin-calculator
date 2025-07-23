const add = (a, b) => new Decimal(a).plus(b);
const subtract = (a, b) => new Decimal(a).minus(b);
const multiply = (a, b) => new Decimal(a).times(b);
const divide = (a, b) => new Decimal(a).dividedBy(b);

const operand1 = [];
let operator = '';
const operand2 = [];
let isOperated = false;

const display = document.querySelector('#display');

const operate = (operand1, operator, operand2) => {
    let result;
    switch (operator) {
        case '+':
            result = add(operand1, operand2); break;
        case '-':
            result = subtract(operand1, operand2); break;
        case '*':
            result = multiply(operand1, operand2); break;
        case '/':
            if (operand2)
                result = divide(operand1, operand2);
            else {
                throw Error('Could not divide by 0');
            }
    }

    return result.toDecimalPlaces(10);
};

const processOperation = (operandArr1, operator, operandArr2) => {
    const x = parseFloat(operandArr1.join(''));
    const y = parseFloat(operandArr2.join(''));

    const result = operate(x, operator, y);
    const splitResult = result.toFixed().split('');

    operand1.splice(0, operand1.length, ...splitResult);
    operand2.splice(0, operand2.length);

    return result;
};

const clearDisplay = () => {
    display.textContent = operator = '';
    operand1.length = operand2.length = 0;
};

document.querySelectorAll('button.digit')
.forEach(btn => btn.addEventListener('click', evt => {
    if (isOperated){
        clearDisplay();
        isOperated = false;
    }
    
    const pressedValue = evt.target.textContent;
    const targetOperand = operator ? operand2 : operand1;

    if (targetOperand.length >= 15) {
        window.alert('Could not input over 15 digits');
        return;
    }

    if (pressedValue === '.' && (targetOperand.includes('.') || targetOperand.length === 0)) return;

    targetOperand.push(pressedValue);
    display.textContent += pressedValue;
}));

document.querySelectorAll('button.operator')
.forEach(btn => btn.addEventListener('click', evt => {
    const followedOperand = operator ? operand2 : operand1;
    if (followedOperand.length === 0 || followedOperand.at(-1) === '.') return;
    
    const pressedValue = evt.target.textContent;

    if (!operator) {
        isOperated = false;
        operator = pressedValue;
        display.textContent += ` ${operator} `;
    } else {
        let result;
        try {
            result = processOperation(operand1, operator, operand2);
        } catch (e) {
            window.alert(e.message);
            return;
        }
        operator = pressedValue;
        display.textContent = `${result} ${operator} `;
    }
}));

document.querySelector('#equal').addEventListener('click', () => {
    if (operand1.length === 0 || !operator || operand2.length === 0 || operand2.at(-1) === '.')
        return;

    let result;
    try {
        result = processOperation(operand1, operator, operand2);
    } catch (e) {
        window.alert(e.message);
        return;
    }

    operator = '';
    isOperated = true;
    display.textContent = result;
});

document.querySelector('#clear').addEventListener('click', clearDisplay);

document.querySelector('#backspace').addEventListener('click', () => {
    const currentInput = display.textContent;
    
    if (operand2.length > 0) {
        operand2.pop();
        display.textContent = currentInput.slice(0, -1);
    }
    else if (operator) {
        operator = '';
        display.textContent = currentInput.slice(0, -3);
    }
    else if (operand1.length > 0) {
        operand1.pop();
        display.textContent = currentInput.slice(0, -1);
    }
    else return;
});

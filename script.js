const display = document.querySelector("#display");
const buttons = [...document.querySelectorAll(".btn")];
const listValeur = buttons.map(button => button.dataset.value);
console.log(buttons, listValeur);

document.addEventListener('click', (e) => {
    const valeur = e.target.dataset.value;
    calculer(valeur);
});

const calculer = (valeur) => {
    if (listValeur.includes(valeur)) {
        switch (valeur) {
            case 'C':
                display.textContent = "";
                break;
            case '=':
                const calcul = calculateExpression(display.textContent);
                display.textContent = calcul;
                break;
            default:
                display.textContent += valeur;
        }
    }
};

const calculateExpression = (expression) => {
    try {
        const tokens = expression.split(/([+\-*/])/);
        const stack = [];
        const operators = [];
        
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
        };

        const applyOperator = () => {
            const b = stack.pop();
            const a = stack.pop();
            const operator = operators.pop();
            switch (operator) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        };

        for (const token of tokens) {
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else if (token in precedence) {
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    applyOperator();
                }
                operators.push(token);
            }
        }

        while (operators.length) {
            applyOperator();
        }

        return stack[0];
    } catch (e) {
        return "Error";
    }
};

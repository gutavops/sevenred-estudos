function calcular(a, b, operador) {
    switch (operador) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}
console.log(calcular(17, 44, '+'));
console.log(calcular(17, 44, '/'));
console.log(calcular(17, 44, '-'));
console.log(calcular(17, 44, '*'));

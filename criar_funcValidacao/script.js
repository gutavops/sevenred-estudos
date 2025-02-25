function calculadora(number1, number2) {
    let soma = number1 + number2;

    if (soma > 10) {
        console.log("Maior que 10");
    } else if (soma < 10) {
        console.log("Menor que 10");
    } else {
        console.log("Igual a 10");
    }
}

calculadora(5, 6)
calculadora(5, 5)
calculadora(2, 2)
function saudacao(nome) {
    return "Ol\u00E1, ".concat(nome, "!");
}
console.log(saudacao("Gustavo"));
function somar(a, b) {
    return a + b;
}
var resultado = somar(5, 10);
console.log("Resultado da soma: ".concat(resultado));
var rectangle = {
    height: 20,
    width: 10
};
var listaPessoas;
(function (listaPessoas) {
    listaPessoas[listaPessoas["Pedro"] = 1] = "Pedro";
    listaPessoas[listaPessoas["Ana"] = 2] = "Ana";
    listaPessoas[listaPessoas["Gustavo"] = 3] = "Gustavo";
    listaPessoas[listaPessoas["J\u00F5ao"] = 4] = "J\u00F5ao";
    listaPessoas[listaPessoas["Maria"] = 5] = "Maria";
})(listaPessoas || (listaPessoas = {}));
console.log(listaPessoas.Gustavo);

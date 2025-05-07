function saudacao(nome: string): string {
    return `Olá, ${nome}!`;
  }
  
console.log(saudacao("Gustavo"));

function somar(a: number, b: number): number {
    return a + b;
  }
  

const resultado = somar(5, 10);
console.log(`Resultado da soma: ${resultado}`);
  
interface Rectangle {
    height: number,
    width: number
  }
  
const rectangle: Rectangle = {
    height: 20,
    width: 10
  };  

enum listaPessoas {
    Pedro = 1,
    Ana,
    Gustavo,
    Jõao,
    Maria
}

console.log(listaPessoas.Gustavo)
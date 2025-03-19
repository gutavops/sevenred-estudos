 
const funcao = (param1, param2, param3) => `${param1} - ${param2} - ${param3}`
function funcao2 (param1, param2, param3) {
    return `${param1} - ${param2} - ${param3}`
}
// console.log(funcao('Palavra', 2, true))
// console.log(funcao2('Outro', 3, false))

const listaPessoa = [
    {
        id: 'abcde12345',
        nome: 'Ana',
        idade: 22,
        ativo: true
    },
    {
        id: 'asdcf13523',
        nome: 'Jose',
        idade: 50,
        ativo: false
    },
    {
        id: 'asdcf9876',
        nome: 'Paulo',
        idade: 30,
        ativo: true
    },
]
console.log("listaPessoa:: ", listaPessoa)
const listaNomeEIdadePessoa = listaPessoa.map(pessoa => {
    return {
        nome: pessoa.nome,
        idade: pessoa.idade,
    }
})
// console.log("listaNomeEIdadePessoa:: ", listaNomeEIdadePessoa)
const pessoasAtivas = listaPessoa.filter(pessoa => pessoa.ativo)
// console.log("pessoasAtivas:: ", pessoasAtivas)
const pessoaPeloId = listaPessoa.find(pessoa => pessoa.id === 'asdcf13523')
// console.log("pessoaPeloId:: ", pessoaPeloId)

const idsLista = listaPessoa.map(pessoa => pessoa.id)
console.log("idsLista:: ", idsLista)
const idsListaString = idsLista.join(' - ')
console.log("idsListaString:: ", idsListaString)
const idsListaString2 = listaPessoa.filter(pessoa => pessoa.ativo).map(pessoa => pessoa.id).join(' - ')
console.log("idsListaString2:: ", idsListaString2)
 
 const exibirParametro = (param) => console.log(param)

 exibirParametro("Oi")
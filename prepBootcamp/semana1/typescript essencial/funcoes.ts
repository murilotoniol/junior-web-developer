// tipagem de parametro e retorno
function somar(a: number, b:number):number {
    return a + b
}

// arrow function
const subtrair = (a: number, b: number):number => { return a - b}

// parametros opcionais
function saudar(nome: string, sobrenome?: string): string {
    return sobrenome? `Ola ${nome} ${sobrenome}, como vai?` : `Ola ${nome}, como vai?`
}

// parametros fixos
function criar(nome:string, idade:number = 18): void {
    console.log(nome, idade)
}

// rest params
function somarTodos(...numeros: number[]): number {
    return numeros.reduce((acc, num) => acc + num, 0)
}

// tipo de funcao
type OperacaoMatematica = (a: number, b: number) => number

const multiplicacao: OperacaoMatematica = (a, b) => {return a * b}
const divisao: OperacaoMatematica = (a, b) => {return a / b}

// sobrecarga de funcao
function processar(valor:string):string
function processar(valor: number):number

function processar(valor: string|number):string|number {
    if (typeof valor === "string"){
        return valor.toUpperCase()
    }
    return valor * 2
}

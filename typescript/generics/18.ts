// 18. Crie uma classe genérica 'Caixa' que:
// - armazena um valor do tipo T
// - tem método getValor(): T
// - tem método setValor(valor: T): void

class Caixa<T> {
    private valor: T

    constructor(valorInicial: T){
        this.valor = valorInicial
    }
    
    getValor(): T {
        return this.valor
    }

    setValor(novoValor: T): void {
        this.valor = novoValor
    }
}

const caixa = new Caixa<number>(10)
console.log(caixa.getValor())
caixa.setValor(12)
console.log(caixa.getValor())
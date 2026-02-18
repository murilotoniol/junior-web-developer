// 20. Crie uma interface genérica 'Resultado' que pode ser:
// - { sucesso: true, dados: T }
// - { sucesso: false, erro: string }
// Use union types

type Resultado<T> =
    |{sucesso: true; dados: T}
    |{sucesso: false; erro: string}

function dividir(a: number, b:number): Resultado<number> {
    if (b === 0) {
        return {sucesso: false, erro: "Divisao por zero nao é permitida"}
    }

    return {sucesso: true, dados: a / b}
}

console.log(dividir(1, 0))
// 16. Crie uma interface genérica 'Par' que representa um par de valores do mesmo tipo

interface Par<T> {
    primeiro: T
    segundo: T
}

const numeros:Par<number> = {
    primeiro: 10,
    segundo: 5
}

const strings:Par<string> = {
    primeiro: 'ola ',
    segundo: 'mundo'
}

console.log(numeros)
console.log(numeros.primeiro + numeros.segundo)
console.log(strings)
console.log(strings.primeiro + strings.segundo)
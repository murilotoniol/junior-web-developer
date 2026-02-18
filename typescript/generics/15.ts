// 15. Crie uma função genérica 'reverter' que inverte um array mantendo o tipo

function reverter<T>(array: T[]): T[] {
    return array.slice().reverse()
}

console.log(reverter([1, 2, 3, 4, 5]))
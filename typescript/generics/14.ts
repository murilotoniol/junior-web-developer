// 14. Crie uma função genérica 'ultimo' que retorna o último elemento de um array
// Exemplo: ultimo([1,2,3]) -> 3, ultimo(['a','b']) -> 'b'

function ultimo<T>(array: T[]): T | undefined {
    return array[array.length-1]
}

const a = [1, 2 , 3]
console.log(ultimo(a))
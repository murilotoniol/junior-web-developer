// 19. Crie uma função genérica 'filtrar' que:
// - recebe um array de tipo T
// - recebe uma função de predicado (item: T) => boolean
// - retorna um novo array com itens que passaram no predicado

function filtrar<T>(array: T[], predicado: (item: T) => boolean): T[] {
    const resultado: T[] = []
    for (const item of array) {
        if (predicado(item)) {
            resultado.push(item)
        }
    }
    return resultado

    /* ou da pra usar .filter:
    return array.filter(predicado)
    */
}

const numeros = [1, 2, 3, 4, 5]
const pares = filtrar(numeros, n => n > 2)
console.log(pares)
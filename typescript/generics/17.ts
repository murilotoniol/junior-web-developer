// 17. Crie uma função genérica 'embrulhar' que recebe um valor e retorna { valor: T }

function embrulhar<T>(valor: T): {valor: T} {
    return {valor}
}

console.log(embrulhar(42))
console.log(embrulhar('ola mundooo'))
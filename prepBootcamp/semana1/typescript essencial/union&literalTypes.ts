// union type (pode ser um ou outro)
let id: string|number
id = 'ola'
id = 21
//id = true // erro pq nao é string ou number

function imprimir(valor: string | number) {
    if (typeof valor === "string"){
        console.log(valor.toUpperCase())
    } else {
        console.log(valor.toFixed(2));
    }
}

// literal types
let direcao: 'norte' | 'sul' | 'leste' | 'oeste'
direcao = 'sul'
//direcao = 'nordeste' // Type '"nordeste"' is not assignable to type '"norte" | "sul" | "leste" | "oeste"
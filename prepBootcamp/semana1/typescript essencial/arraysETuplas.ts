// arrays 
let numeros:number[] = [1, 2 ,3] 
let frutas: Array<string> = ["maça", "banana", "melancia"] // sintaxe alternativa

// array de tipos mistos
let multiplos: (string|number)[] = [1, 'dois', 3]

// tuplas => arrays com tamanho e tipo fixos
let tupla: [number, string] = [10, 'oi']

// readonly
const constantes: readonly number[] = [1, 2, 3]
//constantes.push(4) // Property 'push' does not exist on type 'readonly number[]'
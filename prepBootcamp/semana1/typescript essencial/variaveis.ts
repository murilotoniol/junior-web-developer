// tipos basicos
let nome:string = "Joao"

let idade:number = 30

let ativo:boolean = true
let inativo:boolean = false

let indefinido:undefined = undefined

let nulo:null = null

// any (evitar usar pois perde a tipagem)
let qualquerCoisa:any = "texto"
qualquerCoisa = 123 // qualquerCoisa = true

// unkwown (mais seguro que any, pois obriga a verificacao do tipo antes de usar)
let desconhecido:unknown = "texto"
// desconhecido.toUpperCase() // erro, pois desconhecido pode ser de qualquer tipo
if(typeof desconhecido === "string"){
    desconhecido.toUpperCase() // ok, pois sabemos que desconhecido é uma string
}

// void (utilizado para funcoes que nao retornam nada)
function erro(mensagem: string): void {
    throw new Error(mensagem)
}

// never (funcoa que nunca retorna)
function nunquinha(mensagem: string): never {
    throw new Error(mensagem)
}
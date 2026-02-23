// objeto (tipo inline)
let usuario: {nome: string, email: string} = {
    nome: "Murilo",
    email: "atm@atm.atm"
}

// interface
interface Pessoa {
    nome: string
    email?: string // opcional
    idade: number
    readonly cpf: string
    saudar(): string // metodo da interface Pessoa que retorna uma string
}

let murilo:Pessoa = {
    nome: "Murilo",
    email: "atm@atm.atm",
    idade: 22,
    cpf: '999999',
    saudar() {
        return 'ola'
    }
}

// type alias
type Animal = {
    especie: string,
    som: string
}

const cachorro: Animal = {
    especie: 'cachorro',
    som: 'latido'
}

// intersection types
type PessoaComEndereco = Pessoa & {
    endereco: string,
    cidade: string
}

const murilo2: PessoaComEndereco = {
    nome: "Murilo",
    email: "atm@atm.atm",
    idade: 22,
    cpf: '999999',
    saudar() {
        return 'ola'
    },
    endereco: 'Rua imaginaria',
    cidade: 'pindamonhangaba'
}
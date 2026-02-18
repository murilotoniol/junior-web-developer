// 7. Crie uma interface 'Usuario' com:
// - id (number)
// - nome (string)
// - email (string)
// - telefone (opcional)
// - endereco (objeto com: rua, cidade, cep)

interface Usuario {
    id: number
    nome: string
    email: string
    telefone: number|null|undefined
    endereco: {
        rua: string
        cidade: string
        cep: number
    }
}

const murilo: Usuario = {
    id: 1,
    nome: 'Murilo Toniol',
    email: 'aa@aa.a',
    telefone: null,
    endereco: {
        rua: 'marciano chuk',
        cidade: 'Mairnga',
        cep: 99999
    }
}

console.log(murilo)
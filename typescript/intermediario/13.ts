// 13. Use Omit para criar um tipo Usuario sem o campo 'id'

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

type UsuarioSemId = Omit<Usuario, 'id'>

const novoUsuario: UsuarioSemId = {
    nome: 'Murilo',
    email: 'aaa@aaa.com',
    telefone: null,
    endereco: {
        rua: 'aaaaaaaa',
        cidade: 'maringa',
        cep: 123123
    }
}

console.log(novoUsuario)
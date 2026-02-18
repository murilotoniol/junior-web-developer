// 12. Use Pick para criar um tipo que tenha apenas 'nome' e 'email' de Usuario


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


type UsuarioContato = Pick<Usuario, 'nome'|'email'>

const contato: UsuarioContato = {
    nome: 'Maria',
    email: 'aaa@aaa.aa'
}

console.log(contato)
// 8. Crie uma função async que simula buscar um usuário por ID
// Deve retornar Promise<Usuario | null>
// Use setTimeout para simular delay de 1 segundo

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

async function buscarUsuarioPorId(id:number): Promise<Usuario | null> {
    return new Promise ((resolve) => {
        setTimeout(() => {
            const usuarios: Usuario[] = [
                {
                    id:1,
                    nome: "Ana",
                    email: "aaa@aaa.aa",
                    telefone: null,
                    endereco: {rua: "nildo", cidade:'mandaguacu', cep: 123123}
                },
                {
                    id:2,
                    nome: "Murilo",
                    email: "aaa@aaa.aa",
                    telefone: 999999,
                    endereco: {rua: "marciano", cidade:'Maringa', cep: 123123}
                }
            ]

            const usuarioEncontrado = usuarios.find(u => u.id === id)
            resolve(usuarioEncontrado || null)
        }, 1000)
    })
}

buscarUsuarioPorId(2).then(usuario => console.log(usuario))
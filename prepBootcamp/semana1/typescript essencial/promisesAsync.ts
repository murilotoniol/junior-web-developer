interface Pessoa {
    nome: string
    email?: string // opcional
    idade: number
    readonly cpf: string
    saudar(): string // metodo da interface Pessoa que retorna uma string
}

// promise tipada
const minhaPromise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('sucesso')
    }, 1000)
})

// async function
async function buscarUsuario(id:number) {
    const resposta = await fetch(`/api/usuarios/${id}`)
    const dados:Pessoa = await resposta.json()
    return dados
}

// com tratamento de erros
async function buscarDados(): Promise<Pessoa|null> {
    try {
        const resposta = await fetch(`/api/dados`)
        if (!resposta.ok) {
            throw new Error('Erro na requisição')
        }

        const dados: Pessoa = await resposta.json()
        return dados
    } catch (erro) {
        console.error(erro)
        return null
    }
}

// tipando response da api
interface ApiResponse<T> {
    dados: T,
    mensagem: string,
    status: number
}

async function fetchApi<T>(url:string): Promise<ApiResponse<T>> {
    const resposta = await fetch(url)
    return resposta.json()
}
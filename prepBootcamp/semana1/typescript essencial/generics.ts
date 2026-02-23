// generic basico
function primeiro<T>(array: T[]):T|undefined {
    return array[0]
}

const num = primeiro([1, 2, 3])
const str = primeiro(['ola', 'mundo'])

//interface com generic
interface Resposta<T> {
    dados: T,
    sucesso: boolean,
    mensagem: string
}
interface Pessoa {
    nome: string
    email?: string // opcional
    idade: number
    readonly cpf: string
    saudar(): string // metodo da interface Pessoa que retorna uma string
}

const resposta:Resposta<Pessoa> = {
    dados: {nome: 'Ana', idade: 30, cpf: '99999', saudar(){
        return 'ola'
    }},
    sucesso: true,
    mensagem: 'OK'
}

// generic com restricao
function pegarNome<T extends {nome: string}>(obj:T):string {
    return obj.nome
}

// multiplos generics
function mapear<T, U> (array:T[], fn: (item:T) => U): U[] { // estudar melhor
    return array.map(fn)
}

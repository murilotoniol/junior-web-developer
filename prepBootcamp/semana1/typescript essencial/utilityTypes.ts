interface ToDo {
    titulo: string
    descricao: string
    completo: boolean
}

// Partial - torna todas propriedades opcionais
type TodoParcial = Partial<ToDo>
const todo1: TodoParcial = { titulo: "ish"} // OK

// Required - torna todas obrigatórias
type TodoObrigatorio = Required<TodoParcial>
const todo2: TodoObrigatorio = {titulo:"tarefa", descricao: "a", completo: true}

// Readonly - todas readonly
type TodoReadonly = Readonly<ToDo>
const todo3:TodoReadonly = {titulo:"tarefa", descricao: "a", completo: true}
//todo3.descricao = "oi" // errooo

// pick - seleciona propriedades especificas
type TodoPreview = Pick<ToDo, "titulo" | "completo">;

// omit - exclui propriedades específicas
type TodoNoDescricao = Omit<ToDo, "descricao">

// record - cria objeto com chaves e valores tipados
type Paginas = "home" | "sobre" | "contato"
type PaginaInfo = Record<Paginas, {titulo:string, url:string}>
const paginas:PaginaInfo = {
    home: {titulo: "aaa", url:"aa"},
    sobre: {titulo: "bbb", url:"bb"},
    contato: {titulo: "ccc", url:"cc"}
}

// returntype - extrai tipo de retorno de função
function criarUsuario(){
    return {nome: 'Joao', idade: 30}
}

type Usuario = ReturnType<typeof criarUsuario>
const usuario:Usuario = {
    nome:"maria",
    idade:25
}

// Parameters - extrai tipos dos parâmetros
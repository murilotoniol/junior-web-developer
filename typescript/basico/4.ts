// 4. Crie uma função que recebe um produto e retorna uma string formatada
// Exemplo: "Notebook - R$ 2500.00"

interface Produto {
    id : number;
    nome: string;
    preco: number;
    emEstoque: boolean;
}

const sabonete: Produto = {
    id: 1,
    nome: "Sabonete Vegano",
    preco: 11.99,
    emEstoque: true
}

function formataProduto(produto: Produto):string {
    return `${produto.nome} - R$ ${produto.preco}`
}

console.log(formataProduto(sabonete))
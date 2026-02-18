// 2. Crie uma interface 'Produto' com: id (number), nome (string), preco (number), emEstoque (boolean)
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

console.log(sabonete)
console.log(typeof sabonete)
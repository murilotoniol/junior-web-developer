// 3. Crie um array de produtos usando a interface acima

interface Produto {
    id : number;
    nome: string;
    preco: number;
    emEstoque: boolean;
}

const array: Produto[] = [
    {
        id: 1,
        nome: "sabonete",
        preco: 12,
        emEstoque: true
    },
    {
        id: 2,
        nome: "leite",
        preco: 22,
        emEstoque: true
    }
]

console.log(array)
console.log(typeof array)
console.log(Array.isArray(array))
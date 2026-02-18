// 6. Crie uma função que recebe um status e retorna uma cor
// pendente -> amarelo, aprovado -> verde, rejeitado -> vermelho

type Status2 = 'pendente' | 'aprovado' | 'rejeitado'

const corStatus = (status:Status2):string => {
    switch (status) {
        case 'pendente':
            return 'amarelo';
        case 'aprovado':
            return 'verde';
        case 'rejeitado':
            return 'vermelho';
    }
}

const pendente = 'pendente'
const aprovado = 'aprovado'

console.log(corStatus(pendente))
console.log(corStatus(aprovado))
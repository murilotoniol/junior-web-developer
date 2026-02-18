// 11. Crie uma interface 'Transacao' com:
// - id (string)
// - tipo (TipoTransacao)
// - valor (number)
// - data (Date)

enum TipoTransacao {
    DEPOSITO,
    SAQUE,
    TRANSFERENCIA
}

interface Transacao {
    id: string
    tipo: TipoTransacao
    valor: number
    data: Date
}

const transacao: Transacao = {
    id: '1',
    tipo: TipoTransacao.DEPOSITO,
    valor: 10,
    data: new Date()
}
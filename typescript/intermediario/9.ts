// 9. Crie uma classe 'ContaBancaria' com:
// - saldo privado (number)
// - titular público (string)
// - método depositar(valor: number): void
// - método sacar(valor: number): boolean (retorna false se saldo insuficiente)
// - getter para ver saldo


class ContaBancaria {
    titular: string
    private saldo: number

    constructor( titular: string, saldo: number){
        this.saldo = saldo
        this.titular = titular
    }

    depositar(valor: number): void {
        this.saldo += valor
    }

    sacar(valor: number): boolean {
        if (valor > this.saldo){
            console.log("Saldo indisponivel")
            return false
        }

        if (valor <= 0){
            console.log("Valor invalido")
            return false
        }

        this.saldo -= valor
        return true
    }

    get obterSaldo(): number{
        return this.saldo
    }
}


const conta = new ContaBancaria("Murilo", 1)
console.log(conta.obterSaldo)
conta.depositar(10)
console.log(conta.obterSaldo)
conta.sacar(3)
console.log(conta.obterSaldo)
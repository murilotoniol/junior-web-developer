// classes
class Carro {
    // propriedades precisam ser declaradas
    marca: string
    modelo: string
    private ano: number // só acessa dentro da classe
    protected cor: string // acessa somente na classe e na subclasse
    readonly chassi: string // nao pode alterar

    constructor(marca:string, modelo:string, ano:number, cor:string, chassi:string){
        this.marca = marca
        this.modelo = modelo
        this.ano = ano
        this.cor = cor
        this.chassi = chassi
    }

    // metodo publico
    acelerar():string {
        return `${this.marca} ${this.modelo} agora esta acelerando`
    }

    // metodo privado
    private verificarManutencao():boolean {
        return new Date().getFullYear() - this.ano > 5
    }

    // getter
    get idade():number {
        return new Date().getFullYear() - this.ano
    }

    // setter
    set anoFabricacao(ano:number){
        if(ano > 1900 && ano <= new Date().getFullYear()) {
            this.ano = ano
        }
    }

    // metodo estatico
    static compararCarros(carro1:Carro, carro2:Carro):boolean{
        return carro1.marca === carro2.marca
    }
}

// sintaxe curta com modificadores no constructor
class Pessoa {
    constructor (
        public nome:string,
        public idade:number,
        private cpf:string
    ) {}
    // typescript cria automaticamente as propriedades
}

//heranca
class CarroEletrico extends Carro {
    constructor(
        marca: string,
        modelo:string,
        ano:number,
        cor:string,
        chassi: string,
        public autonomia:number 
    ) {
        super(marca, modelo, ano, cor, chassi)
    }

    // sobrescrita de metodo
    acelerar(): string {
        return `${this.marca} ${this.modelo} acelerando silenciosamente`
    }
}

// implementando interfaces
interface Veiculo {
    acelerar ():void
    frear ():void
}

class Moto implements Veiculo {
    acelerar():void {
        console.log("Moto acelerando")
    }

    frear():void {
        console.log("Moto freando")
    }
}

// classe abstrata
abstract class Animal {
    abstract emitirSom():string

    mover():void {
        console.log("Movendo...")
    }
}

class Cachorro extends Animal {
    emitirSom():string {
        return "Au au"
    }
}
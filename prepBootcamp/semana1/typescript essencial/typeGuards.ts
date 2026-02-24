// typeof
function processar(valor:string|number) {
    if (typeof valor === "string"){
        return valor.toUpperCase() // ts sabe q é string
    }else{
        return valor.toFixed(2) // ts sabe q é numero
    }
}

// instance of
class Gato {
    miar(){console.log("Miau")}
}

class Cachorro {
    latir(){console.log("AuAu")}
}

function fazerSom(animal:Gato|Cachorro){
    if(animal instanceof Gato){
        animal.miar()
    }else{
        animal.latir()
    }
}

// in operator
interface Peixe {
    nadar:() => void
}

interface Passaro {
    voar: () => void
}

function mover(animal:Peixe|Passaro){
    if("nadar" in animal){
        animal.nadar()
    }else{
        animal.voar()
    }
}

// type predicate (custom type guard)
interface Usuario {
    nome: string
    email: string
}

function isUsuario(obj:any): obj is Usuario {
    return obj && typeof obj.nome === "string" && typeof obj.email === "string"
}

function processarDados(dados:unknown){
    if(isUsuario(dados)) {
        console.log(dados.nome) // ts sabe que é Usuario
    }
}
// enum numerico
enum Direcao {
    norte, // 0
    sul, // 1
    leste, // 2
    oeste // 3
}

let para: Direcao = 0

// enum com valores customizados
enum StatusCode {
    sucesso = 200,
    naoEncontrado = 404,
    erroServidor = 500
}

// enum de string
enum Cor {
    vermelho = "RED",
    verde = "GREEN",
    azul = "BLUE"
}

// const enums (mais performatico)
const enum DiaSemana {
    Segunda = "Seg",
    Terça = "Ter",
    Quarta = "Qua"
}
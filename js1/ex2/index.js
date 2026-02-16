/*Teste de Velocidade
Escreva um programa em javascript que permita inserir o nome e a velocidade de dois veículos e exiba na tela uma mensagem dizendo qual dos dois é mais rápido (ou que as velocidades são iguais se este for o caso)*/

const carro1_nome = prompt("Digite o nome do primeiro carro: ") 
const carro1_velocidade = parseFloat(prompt("Digite a velocidade do primeiro carro: "))
const carro2_nome = prompt("Digite o nome do segundo carro: ")
const carro2_velocidade = parseFloat(prompt("Digite a velocidade do segundo carro: "))

if (carro1_velocidade > carro2_velocidade) {
    alert("A velocidade do " + carro1_nome + " é maior que do carro " + carro2_nome)
} else if (carro2_velocidade > carro1_velocidade) {
    alert("A velocidade do " + carro2_nome + " é maior que do carro " + carro1_nome)
}else{
    alert("As velocidades são iguais!")
}

/*Cálculo de Dano
Escreva um programa que permita inserir o nome e o poder de ataque de um personagem, depois o nome, a quantidade de pontos de vida, o poder de defesa de outro personagem e se ele possui um escudo, e então calcule a quantidade de dano causado baseado nas seguintes regras:

Se o poder de ataque for maior do que a defesa e o defensor não possuir um escudo, o dano causado será igual a diferença entre o ataque e a defesa.
Se o poder de ataque for maior do que a defesa e o defensor possuir um escudo, o dano causado será igual a metade da diferença entre o ataque e a defesa.
Se o poder de ataque for menor ou igual a defesa, o dano causado será 0.
Por fim, o programa deve subtrair a quantidade de dano da quantidade de pontos de vida do personagem defensor e exibir na tela a quantidade de dano e as informações atualizadas de ambos os personagens.*/

const nomeAtacante =  prompt("Qual o nome do atacante?")
const poderAtaque = parseFloat(prompt("Quantos pontos de ataque o atacante possui?"))

const nomeDefensor = prompt("Qual o nome do defensor?")
let pontosVida =  parseFloat(prompt("Quantos pontos de vida o defensor tem?"))
const poderDefesa = parseFloat(prompt("Quantos pontos de defesa o defensor possui?"))
const defensorTemEscudo = confirm("O defensor possui um escudo?")

if (poderAtaque > poderDefesa && defensorTemEscudo == false){
    dano = poderAtaque - poderDefesa
} else if (poderAtaque > poderDefesa && defensorTemEscudo == true){
    dano = (poderAtaque - poderDefesa)/2
} else {
    dano = 0
}

pontosVida -= dano
alert("O dano causado foi: " + dano + " e o personagem " + nomeDefensor + " agora tem " + pontosVida + " de vida")
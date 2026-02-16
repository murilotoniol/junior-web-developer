/*Cadastro de Recrutas
Escreva um programa em javascript que permita salvar informações de um recruta. As informações a serem salvas são:

o primeiro nome
o sobrenome
o campo de estudo
o ano de nascimento
Depois o programa deve exibir o nome completo do recruta, seu campo de estudo e sua idade (apenas baseada no ano de nascimento).*/

const nome = prompt("Qual o seu nome, recruta?")
const sobrenome = prompt("Qual o seu sobrenome, recruta?")
const campoEstudo = prompt("Qual o seu campo de estudo, recruta?")
const anoNascimento = parseFloat(prompt("Em que ano você nasceu, recruta?"))
const idade = 2026 - anoNascimento

alert("O recruta " + nome + " " + sobrenome + " que estuda " + campoEstudo + " tem " + idade + " anos!")

/*Calculadora de 4 Operações
Escreve um programa em javascript que permita inserir dois valores numéricos e então calcule o resultado das quatro operações básicas (soma, subtração, multiplicação e divisão).

Após calcular os resultados o programa deve exibi-los na tela.*/


const x = parseFloat(prompt("Vamos fazer as quatro operações, digite um numero:")) 
const y = parseFloat(prompt("Vamos fazer as quatro operações, digite um segundo numero:"))

const sum = x + y
const sub = x - y
const mult = x * y
const div = x / y

alert("soma: " + sum + 
    "\nsubtraçao: " + sub +
    "\nmultiplicação: " + mult +
    "\ndivisão: " + div)
package org.example;

public class Main {
    public static void main(String[] args) {
        String nome = "Murilo Toniol";

        char primeiraLetra = nome.charAt(0);
        System.out.println(primeiraLetra);

        String primeiroNome = nome.substring(0, 6);
        System.out.println(primeiroNome);

        String ultimoNome = nome.substring(7);
        System.out.println(ultimoNome);

        String nomeSubstituto = "Almeida";
        nome = nome.replace("Toniol", nomeSubstituto);
        System.out.println(nome);

        String login = "murilo";

        if (login.equals("murilo")) {
            System.out.println("logado");
        }else{
            System.out.println("login incorreto");
        }
    }
}
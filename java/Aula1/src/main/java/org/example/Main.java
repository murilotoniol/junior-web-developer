package org.example;

public class Main {
    public static void main(String[] args) {
//        String nome = "Murilo Toniol";
//
//        char primeiraLetra = nome.charAt(0);
//        System.out.println(primeiraLetra);
//
//        String primeiroNome = nome.substring(0, 6);
//        System.out.println(primeiroNome);
//
//        String ultimoNome = nome.substring(7);
//        System.out.println(ultimoNome);
//
//        String nomeSubstituto = "Almeida";
//        nome = nome.replace("Toniol", nomeSubstituto);
//        System.out.println(nome);
//
//        String login = "murilo";
//
//        if (login.equals("murilo")) {
//            System.out.println("logado");
//        }else{
//            System.out.println("login incorreto");
//        }
//        int x = 3;
//
//        switch(x){
//            case 1:
//                System.out.println("numero 1");
//            case 2:
//                System.out.println("numero 2");
//            case 3:
//                System.out.println("numero 3");
//        }

//        //for (variavel; comparacao; operacao)
//        for (int i = 0; i <=10; i++) {
//            System.out.println(i);
//        }


        int matriz[][] = new int[3][5];

        for (int i = 0; i < matriz.length; i++) {
            for (int j=0; j<matriz[i].length; j++) {
                matriz[i][j] = i+j;
            }
        }

        for (int i = 0; i < matriz.length; i++) {
            for (int j=0; j<matriz[i].length; j++) {
                System.out.print("["+matriz[i][j]+"]");
            }
            System.out.println();
        }




    }
}
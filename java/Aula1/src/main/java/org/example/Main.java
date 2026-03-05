package org.example;

public class Main {
    public static void main(String[] args) {
        Main apresentar = new Main();
//        // manipulação de string
//
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
//        // condições
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
//
//        // loops
//
//        //for (variavel; comparacao; operacao)
//        for (int i = 0; i <=10; i++) {
//            System.out.println(i);
//        }
//
//
//        int matriz[][] = new int[3][5];
//
//        for (int i = 0; i < matriz.length; i++) {
//            for (int j=0; j<matriz[i].length; j++) {
//                matriz[i][j] = i+j;
//            }
//        }
//
//        for (int i = 0; i < matriz.length; i++) {
//            for (int j=0; j<matriz[i].length; j++) {
//                System.out.print("["+matriz[i][j]+"]");
//            }
//            System.out.println();
//        }

        // metodos
        apresentar.apresentar();
        apresentar.apresentar("apresentar com parametro e sem retorno");
        System.out.println(apresentar.apresentarTexto());
        System.out.println(apresentar.apresentarTexto("apresentar string com parametro"));
        apresentar.apresentarDados("191", 7);
        System.out.println(apresentar.calcular(1, 2, 2));



    }

    /*  tipos de metodos:
        1.metodo sem retorno e sem parametro
        2.metodo sem retorno e com parametro
        3.metodo com retorno e sem parametro
        4.metodo com retorno e com parametro
    */

    // sem retorno e sem parametro (void -> sem retorno; paresenteses vazios -> sem parametro
    public void apresentar(){
        System.out.println("apresentar sem parametro e retorno");
    }

    // sem retorno e com parametro
    public void apresentar(String texto){
        System.out.println(texto);
    }

    // com retorno e sem parametro
    public String apresentarTexto(){
        return "apresentar string mas sem parametro";
    }

    //com retorno e com parametro
    public String apresentarTexto(String texto){
        return texto;
    }

    public void apresentarDados(String cpf, int cod){
        if(cpf.equals("000")){
            System.out.println(cod);
            if (cod == 0){
                System.out.println(cod);
            }else{
                System.out.println("Erroo");
            }
        }else if(cpf.equals("111")){
            System.out.println(cod);
        }else{
            System.out.println("NaN");
        }
    }

    public int calcular(int x, int y, int operacao){
        switch(operacao){
            case 1:
                return x + y;
            case 2:
                return x - y;
            default:
                return 0;
        }
    }
}
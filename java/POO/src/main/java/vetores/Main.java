package vetores;

import java.util.Scanner;

public class Main{
    public static void main(String args[]){
    Scanner sc = new Scanner(System.in);

//    int n = sc.nextInt();
//    Product[] vect = new Product[n];
//
//    for (int i=0;i<vect.length;i++){
//        sc.nextLine();
//        String name = sc.nextLine();
//        double price = sc.nextDouble();
//        vect[i] = new Product(name, price);
//    }
//
//    double sum= 0.0;
//    for (int i=0;i<vect.length;i++){
//        sum += vect[i].getPrice();
//    }
//    double avg = sum/vect.length;
//    System.out.printf("Average price: %.2f%n", avg);
//
//    // vou usar esse arquivo para escrever o codigo de boxign e unboxing
//    // boxing
//    int x = 20;
//    Object obj = x;
//    System.out.println(obj);
//    // unboxing
//    int y = (int)obj;
//    System.out.println(y);

    // vou usar aqui pra exemplo de for each (para cada)
    String[] nomes = new String[] {"Murilo", "Giovani", "Joao"};

    for (int i=0;i<nomes.length;i++){
        System.out.println(nomes[i]);        // for percorrendo cada elemento do vetor nomes
    }

    for (String nome : nomes){   // para cada objeto 'nome' do tipo String contido em 'nomes[]' faça:
        System.out.println(nome);
    }

    sc.close();
    }
}
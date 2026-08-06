package membrosEstaticos;

import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        // System.out.print("Digite o raio: ");
        // double radius = sc.nextDouble();

        // System.out.println("Circumference: " + Calculator.circumference(radius));

        // System.out.println("Volume: " + Calculator.volume(radius));

        // System.out.println(Calculator.PI);

        // exercicio fixacao

        System.out.println("What is the dollar price? ");
        double dollarPrice = sc.nextDouble();
        System.out.println("How many dollars will be bought? ");
        double amount = sc.nextDouble();
        System.out.println("Amount to be paid in reais = " + CurrencyConverter.dollarToReal(amount, dollarPrice));

        sc.close();
    }
}
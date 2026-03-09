package membrosEstaticos;

import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        System.out.print("Digite o raio: ");
        double radius = sc.nextDouble();

        System.out.println("Circumference: " + Calculator.circumference(radius));

        System.out.println("Volume: " + Calculator.volume(radius));

        System.out.println(Calculator.PI);
    }
}
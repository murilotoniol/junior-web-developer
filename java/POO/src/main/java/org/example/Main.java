package org.example;

import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        Triangle x, y;
        x=new Triangle();
        y=new Triangle();
        Scanner sc = new Scanner(System.in);

        System.out.println("Digite as 3 medidas do triangulo x:");
        x.a = sc.nextDouble();
        x.b = sc.nextDouble();
        x.c = sc.nextDouble();

        System.out.println("Digite as 3 medidas do triangulo y:");
        y.a = sc.nextDouble();
        y.b = sc.nextDouble();
        y.c = sc.nextDouble();

//        double p = (x.a + x.b + x.c)/2.0;
        double areaX = x.calculateArea();
//
//        p=(y.a + y.b + y.c)/2.0;
        double areaY = y.calculateArea();

        System.out.printf("Triangle X area: %.4f%n", areaX);
        System.out.printf("Triangle Y area: %.4f%n", areaY);

        if (areaX > areaY){
            System.out.println("X area is bigger");
        }else{
            System.out.println("Y area is bigger");
        }
        sc.close();
    }
}
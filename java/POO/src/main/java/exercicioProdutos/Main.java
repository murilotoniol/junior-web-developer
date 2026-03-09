package exercicioProdutos;

import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter product data:");
        System.out.print("Name: ");
        String name = sc.nextLine();
        System.out.print("Price: ");
        double price = sc.nextDouble();
        System.out.print("Quantity in stock: ");
        int quantity = sc.nextInt();
        Product product = new Product(name, price, quantity);

        System.out.println(product);

        System.out.print("Enter the number of products to be added in stock: ");
        product.addProduct(sc.nextInt());

        System.out.println(product);

        System.out.print("Enter the number of products to be removed from stock: ");
        product.removeProduct(sc.nextInt());

        System.out.println(product);

        sc.close();
    }
}

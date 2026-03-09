package exercicioProdutos;

import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Product product = new Product();
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter product data:");
        System.out.print("Name: ");
        product.name = sc.nextLine();
        System.out.print("Price: ");
        product.price = sc.nextDouble();
        System.out.print("Quantity in stock: ");
        product.quantity = sc.nextInt();

        product.printProduto();

        System.out.print("Enter the number of products to be added in stock: ");
        product.addProduct(sc.nextInt());

        product.printProduto();

        System.out.print("Enter the number of products to be removed from stock: ");
        product.removeProduct(sc.nextInt());

        product.printProduto();

        sc.close();
    }
}

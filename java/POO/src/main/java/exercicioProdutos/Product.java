package exercicioProdutos;

public class Product {
    String name;
    double price;
    int quantity;

    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Product (String name, double price){
        this.name = name;
        this.price = price;
    }

    public double totalValueInStock(){
        return quantity * price;
    }

    public void addProduct(int quantity){
        this.quantity += quantity;
    }

    public void removeProduct(int quantity){
        this.quantity -= quantity;
    }

    public String toString(){
        return "Product data: "
                +name
                +", $: "
                +String.format("%.2f", price)
                +", "
                +quantity
                +" units, Total: "
                +String.format("%.2f", totalValueInStock());
    }
}

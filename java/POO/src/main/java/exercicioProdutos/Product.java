package exercicioProdutos;

public class Product {
    String name;
    double price;
    int quantity;

    public double totalValueInStock(){
        return quantity;
    }

    public void addProduct(int quantity){
        this.quantity += quantity;
    }

    public void removeProduct(int quantity){
        this.quantity -= quantity;
    }

    public void printProduto(){
        System.out.println("Product data: "+name+", $: "+price+", "+quantity+" units, Total: "+(quantity * price));
    }
}

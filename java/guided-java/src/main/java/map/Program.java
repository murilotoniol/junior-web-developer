package map;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class Program {
    public static void main(String args[]) {

//        Map<String, String> cookies = new TreeMap<>();
//
//        cookies.put("Nome", "Maria");
//        cookies.put("Email", "maria@gmail.com");
//        cookies.put("Phone", "123123");
//
//        cookies.remove("Phone");
//        cookies.put("Phone", "1234");
//
//        System.out.println("Size: " + cookies.size());
//        System.out.println("Contains key phone? " + cookies.containsKey("Phone"));
//
//        for (String key : cookies.keySet()) {
//            System.out.println(key+ ": " + cookies.get(key));
//        }

//        Map<Product, Double> stock = new HashMap<>();
//
//        Product p1 = new Product("TV", 900.00);
//        Product p2 = new Product("Notebook", 1200.00);
//        Product p3 = new Product("Tablet", 400.00);
//
//        stock.put(p1, 100000.00);
//        stock.put(p2, 200000.00);
//        stock.put(p3, 300000.00);
//
//        Product ps = new Product("TV", 900.00);
//        System.out.println("Contains 'ps' key: " + stock.containsKey(ps));
//
//        for (Product prod : stock.keySet()){ // faz a leitura com base no produto (nesse caso o produto é a chave)
//            System.out.println(stock.get(prod));
//        }

        Map<String, String> headers = new HashMap<>();

        headers.put("Content-Type", "application/json");
        headers.put("Authorization", "Bearer eyJhbGciOi...");
        headers.put("Accept-Language", "pt-BR");

        String token = headers.get("Authorization");
        System.out.println("Token retornado: " + token);

    }
}

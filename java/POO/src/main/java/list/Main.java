package list;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String args[]) {
        List<String> list = new ArrayList<>();

        list.add("Maria");
        list.add("Alex");
        list.add("Bob");
        list.add("Anna");
        list.add(2,"Bob");

        System.out.println(list.size());
    }
}

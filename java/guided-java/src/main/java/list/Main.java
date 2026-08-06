package list;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String args[]) {
        List<String> list = new ArrayList<>();

        list.add("Maria");
        list.add("Alex");
        list.add("Bob");
        list.add("Anna");
        list.add(2,"Marco");

        System.out.println(list);
        System.out.println(list.size());

        list.remove(2); // tambem entende caso seja escrito remove("Anna");

        System.out.println(list);

        System.out.println("------------------");

        list.removeIf(x -> x.charAt(0) == 'M');
        System.out.println(list);

        System.out.println("------------------");

        System.out.println(list);
        System.out.println("Index of Alex:"+list.indexOf("Alex"));

        System.out.println("------------------");

        // agora vou pegar a lista list, filtrar ela por um parametro e o que corresponder eu vou jogar para uma nova lista}
        List<String> result = list.stream().filter(x -> x.charAt(0) == 'A').collect(Collectors.toList());
        System.out.println(result);

        System.out.println("------------------");

        String name = list.stream().filter(x -> x.charAt(0) == 'Z').findFirst().orElse(null);
        System.out.println(name);
    }
}

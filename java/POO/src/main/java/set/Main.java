package set;

import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String args[]){

        Set<String> tags = new HashSet<>();

        tags.add("#java");
        tags.add("#backend");
        tags.add("#java"); //ignora pois nao aceita duplicidade

        System.out.println("Tags: " + tags);
    }
}

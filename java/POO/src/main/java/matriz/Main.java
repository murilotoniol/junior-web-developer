package matriz;

import java.util.Scanner;

public class Main {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int matriz[][] = new int[n][n];

        for (int i=0; i< matriz.length;i++){
            for (int j=0;j<matriz[i].length;j++){
                matriz[i][j] = sc.nextInt();
            }
        }

        int count = 0;
        for (int i=0;i<matriz.length;i++){
            for (int j=0;j<matriz[i].length;j++){
                if(matriz[i][j] < 0){
                    count++;
                }
                System.out.print("["+matriz[i][j]+"]");
            }
            System.out.println();
        }

        int diagonal[] = new int[n];

        for (int i=0;i<n;i++){
            System.out.println(matriz[i][i]);    // imprimir as diagonais
        }

        System.out.println("Numeros negativos: "+count);

        sc.close();
    }
}

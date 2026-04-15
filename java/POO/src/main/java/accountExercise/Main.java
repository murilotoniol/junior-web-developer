package accountExercise;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter account number:");
        int accountNumber = sc.nextInt();
        System.out.println("Enter account holder:");
        String accountHolder = sc.next();
        System.out.println("Is the an initial deposit (y/n)?");
        char response = sc.next().charAt(0);
        Account account;

        if (response == 'y'){
            System.out.println("Enter initial deposit value:");
            double initialDeposit = sc.nextDouble();
            account = new Account(accountNumber, accountHolder, initialDeposit);
        }else{
            account = new Account(accountNumber, accountHolder);
        }

        System.out.println("Account data:");
        System.out.println(account);

        System.out.println("Enter a deposit value:");
        account.deposit(sc.nextDouble());
        System.out.println("Updated account data:");
        System.out.println(account);


        System.out.println("Enter a withdraw value:");
        account.withdraw(sc.nextDouble());
        System.out.println("Updated account data:");
        System.out.println(account);

        sc.close();
    }
}

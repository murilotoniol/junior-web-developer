package exercicioContrato;

import exercicioContrato.model.HourContract;
import exercicioContrato.model.Worker;

import java.util.Date;
import java.util.Scanner;

public class Program {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter department's name: ");
        String department = sc.nextLine();
        System.out.println("Enter worker data: ");
        System.out.print("Name: ");
        String workerName = sc.nextLine();
        System.out.print("Level: ");
        String level = sc.nextLine();
        System.out.print("Base salary");
        Double salary = sc.nextDouble();

        Worker worker = new Worker(workerName, level, salary, department);

        System.out.print("How many contracts to this worker?");
        int nContracts = sc.nextInt();

        for (int i = 0; i<nContracts; i++){
            System.out.println("Enter contract #" + (i+1) + " data:");
            System.out.print("Date (DD/MM/YYYY): ");
            sc.nextLine();
            Date date = sc.nextLine();
            System.out.print("Value per hour: ");
            double valuePerHour = sc.nextDouble();
            System.out.print("Duration (hours): ");
            int hours = sc.nextInt();

            HourContract hourContract = new HourContract(date, valuePerHour, hours);
        }

        System.out.print("Enter month and year to calculate income (MM/YYYY)");
        System.out.println("Name: " + worker.getName());
        System.out.println("Department: " + worker.getDepartment());


        sc.close();
     }
}

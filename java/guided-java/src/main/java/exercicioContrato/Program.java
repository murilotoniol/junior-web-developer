package exercicioContrato;

import exercicioContrato.enums.WorkerLevel;
import exercicioContrato.model.Department;
import exercicioContrato.model.HourContract;
import exercicioContrato.model.Worker;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class Program {
    public static void main(String[] args) throws ParseException {
        Scanner sc = new Scanner(System.in);
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        System.out.print("Enter department's name: ");
        String departmentName = sc.nextLine();

        System.out.println("Enter worker data: ");
        System.out.print("Name: ");
        String workerName = sc.nextLine();
        System.out.print("Level: ");
        String level = sc.nextLine();
        System.out.print("Base salary: ");
        double salary = sc.nextDouble();

        // Instanciação considerando que Worker recebe Department e WorkerLevel como Objeto/Enum
        Worker worker = new Worker(workerName, WorkerLevel.valueOf(level), salary, new Department(departmentName));

        System.out.print("How many contracts to this worker? ");
        int nContracts = sc.nextInt();

        for (int i = 0; i < nContracts; i++) {
            System.out.println("Enter contract #" + (i + 1) + " data:");
            System.out.print("Date (DD/MM/YYYY): ");
            String dateStr = sc.next(); // Usa sc.next() para evitar problemas com quebra de linha
            Date date = sdf.parse(dateStr);

            System.out.print("Value per hour: ");
            double valuePerHour = sc.nextDouble();
            System.out.print("Duration (hours): ");
            int hours = sc.nextInt();

            HourContract hourContract = new HourContract(date, valuePerHour, hours);
            worker.addContract(hourContract); // Adiciona o contrato à lista do trabalhador
        }

        System.out.println();
        System.out.print("Enter month and year to calculate income (MM/YYYY): ");
        String monthAndYear = sc.next();

        int month = Integer.parseInt(monthAndYear.substring(0, 2));
        int year = Integer.parseInt(monthAndYear.substring(3));

        System.out.println("Name: " + worker.getName());
        System.out.println("Department: " + worker.getDepartment().getName());
        System.out.println("Income for " + monthAndYear + ": " + String.format("%.2f", worker.income(year, month)));

        sc.close();
    }
}
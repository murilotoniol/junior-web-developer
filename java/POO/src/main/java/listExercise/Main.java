package listExercise;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);

        System.out.print("How many employees will be registered? ");
        int n = sc.nextInt();

        List<Employee> list = new ArrayList<>(n);

        for (int i=0; i<n; i++){
            System.out.println("Employee #"+(i+1));
            System.out.print("Id: ");
            Integer id = sc.nextInt();
            sc.nextLine();

            System.out.print("Name: ");
            String name = sc.nextLine();

            System.out.print("Salary: ");
            Double salary = sc.nextDouble();


            list.add(new Employee(id, name, salary));
        }

        System.out.print("Enter the employee id that will have salary increase: ");
        int salaryIncreaseId = sc.nextInt();
        System.out.print("Enter the percentage: ");
        double percentage = sc.nextDouble();

        list.stream().filter(x -> x.getId().equals(salaryIncreaseId)).findFirst().ifPresent(x -> x.setSalary(x.getSalary() + (x.getSalary() * percentage / 100)));

        System.out.println("List of employees:");
        for (Employee emp : list){
            System.out.println(emp.getId() + ", " + emp.getName() + ", " + String.format("%.2f", emp.getSalary()));
        }

        sc.close();
    }
}

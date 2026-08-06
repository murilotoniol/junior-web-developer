package accountExercise;

public class Account {
    private Integer accountNumber;
    private String accountHolder;
    private Double balance;

    public Account(Integer accountNumber, String accountHolder) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        balance = 0.0;
    }

    public Account(Integer accountNumber, String accountHolder, Double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    public Integer getAccountNumber(){
        return accountNumber;
    }

    public String getAccountHolder(){
        return accountHolder;
    }

    public Double getBalance(){
        return balance;
    }

    public void setAccountBalance(Double balance){
        this.balance = balance;
    }

    public void deposit(Double amount){
        balance += amount;
    }

    public void withdraw(Double amount){
        balance -= amount;
    }

    public String toString(){
        return "Account data: "
                +accountNumber
                +", Holder: "
                +accountHolder
                +", Balance: $ "
                +String.format("%.2f", balance);
    }
}

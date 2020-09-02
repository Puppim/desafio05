import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = { income: 0, outcome: 0, total: 0 };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const intialIncom = 0;
    const initialOutcome = 0;
    const incomeSum = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce(
        (acumulador, transaction) => acumulador + transaction.value,
        intialIncom,
      );
    const outcomeSum = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce(
        (acumulador, transaction) => acumulador + transaction.value,
        initialOutcome,
      );

    this.balance.income = incomeSum;
    this.balance.outcome = outcomeSum;
    this.balance.total = incomeSum - outcomeSum;
    // console.log(this.balance.total);
    return this.balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

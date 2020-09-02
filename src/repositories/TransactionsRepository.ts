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
    const balance = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;

          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    // return balance;

    // const intialIncom = 0;
    // const initialOutcome = 0;
    // const incomeSum = this.transactions
    //   .filter(({ type }) => type === 'income')
    //   .reduce(
    //     (acumulador, transaction) => acumulador + transaction.value,
    //     intialIncom,
    //   );
    // const outcomeSum = this.transactions
    //   .filter(({ type }) => type === 'outcome')
    //   .reduce(
    //     (acumulador, transaction) => acumulador + transaction.value,
    //     initialOutcome,
    //   );

    this.balance.income = balance.income;
    this.balance.outcome = balance.outcome;
    this.balance.total = balance.income - balance.outcome;
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

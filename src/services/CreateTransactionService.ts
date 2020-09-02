import { json } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type must be income or outcome.');
    }

    if (typeof value !== 'number') {
      throw Error('Value must be a number.');
    }

    if (typeof title !== 'string') {
      throw Error('Title must be a string.');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw Error("You don't have enought balance.");
    }

    const newtransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    // if ((type === 'outcome' && total - value >= 0) || type === 'income') {
    //   const newTransaction: Transaction = this.transactionsRepository.create({
    //     title,
    //     value,
    //     type,
    //   });

    return newtransaction;
    //   }
    //   throw Error("This operation is No't possible !!");
    // }
  }
}
export default CreateTransactionService;

// public execute({ title, value, type }: Request): Transaction {
//   if (type !== 'income' && type !== 'outcome') {
//     throw Error('Type must be income or outcome.');
//   }

//   if (typeof value !== 'number') {
//     throw Error('Value must be a number.');
//   }

//   if (typeof title !== 'string') {
//     throw Error('Title must be a string.');
//   }

//   const { total } = this.transactionsRepository.getBalance();
//   if (type === 'outcome' && value > total) {
//     throw Error("You don't have enought balance.");
//   }

//   const transaction = this.transactionsRepository.create({
//     title,
//     value,
//     type,
//   });

//   return transaction;
// }

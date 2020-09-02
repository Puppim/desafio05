import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransaction = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    const answerBalanceTransaction = {
      transactions: [...allTransaction],
      balance: { ...balance },
    };
    console.log(answerBalanceTransaction);
    response.json(answerBalanceTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const newTransaction = new CreateTransactionService(transactionsRepository);

    const transaction = newTransaction.execute({ title, value, type });
    response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

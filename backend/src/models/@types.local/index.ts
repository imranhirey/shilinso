

/**
 import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
 */
export interface Transaction {
    transactionId: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    date: Date;
    status: 'pending' | 'approved' | 'rejected';
  }


 export interface Wallet {
  walletId: string;
  name: string;
  userId: string;
  transactions: Transaction[];
  createdDate: Date;
  status: 'pending' | 'active' | 'blocked' | 'verification_required';
  balance: number;
}
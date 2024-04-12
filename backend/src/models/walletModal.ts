import mongoose from 'mongoose';
import Transaction from './transactionstsModal.js';

const walletSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type:String,
    required:true

  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  transactions: [{
    type: Array,
    ref: 'Transaction'
  }],
  createdDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'blocked','verification_required'],
    default: 'pending'
  },
  balance: {
    type: Number,
    default: 0
  }
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
import { PartialType } from '@nestjs/mapped-types';
import { TransactionStatus } from '../transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  message: string;
  Status: TransactionStatus;
  transactionRef?: string;
  sourceRef: string;
  paymentRef: string;
  paymentChannel: string;
  paymentTimestamp: string;
}

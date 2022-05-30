import { TransactionStatus } from "../transaction.schema";

export class CreateTransactionDto {
  message: string;
  Status: TransactionStatus
  paymentAmount: number;
  transactionRef: string;
  sourceRef: string;
  paymentRef: string;
  paymentChannel: string;
  paymentTimestamp: string;
}

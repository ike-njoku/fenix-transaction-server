import { TransactionStatus } from "../transaction.schema";

export class CreateTransactionDto {
  paymentAmount: number
  returnUrl: string;
  revenueCode: string;
  revenueName: string;
  payerFirstname: string;
  payerLastname: string;
  payerMiddlename: string;
  payerTin: string;
  payerEmail: string;
  payerPhone: string;
  payerUserId: string;
  transactionRef: string;
  sourceKey: string;
  mdaName: string;
  currency: string;
  items: any[]
}

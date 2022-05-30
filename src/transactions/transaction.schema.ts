import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TransactionStatus = 'PAID' | 'NOT PAID' | 'UNPAID'

export type TransactionDocument = Transaction & Document;
@Schema()
export class Transaction {
  @Prop()
  message: string;
  @Prop()
  Status: TransactionStatus
  paymentAmount: number;
  @Prop()
  transactionRef: string;
  @Prop()
  sourceRef: string;
  @Prop()
  paymentRef: string;
  @Prop()
  paymentChannel: string;
  @Prop()
  paymentTimestamp: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
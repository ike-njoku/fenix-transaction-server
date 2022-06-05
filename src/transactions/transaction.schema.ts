import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TransactionStatus = 'PAID' | 'NOT PAID' | 'UNPAID'

export type TransactionDocument = Transaction & Document;
@Schema()
export class Transaction {
  @Prop()
  paymentAmount: number
  @Prop()
  returnUrl: string;
  @Prop()
  revenueCode: string;
  @Prop()
  revenueName: string;
  @Prop()
  payerFirstname: string;
  @Prop()
  payerLastname: string;
  @Prop()
  payerMiddlename: string;
  @Prop()
  payerTin: string;
  @Prop()
  payerEmail: string;
  @Prop()
  payerPhone: string;
  @Prop()
  payerUserId: string;
  @Prop()
  transactionRef: string;
  @Prop()
  sourceKey: string;
  @Prop()
  mdaName: string;
  @Prop()
  currency: string;
  @Prop()
  items: any[];
  @Prop()
  message: string;
  @Prop()
  Status: TransactionStatus
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
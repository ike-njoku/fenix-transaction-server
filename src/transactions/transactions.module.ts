import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionGateway } from 'src/transaction.gateway';
import { PdfService } from 'src/pdf/pdf.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionGateway,
    PdfService
  ],
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
  ]
})
export class TransactionsModule {}

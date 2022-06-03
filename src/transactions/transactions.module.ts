import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionGateway } from 'src/transaction.gateway';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionGateway
  ],
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
  ]
})
export class TransactionsModule {}

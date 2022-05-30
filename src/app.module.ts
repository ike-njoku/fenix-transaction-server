import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TransactionsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:dgPgp05dURXOJTOF@cluster0.zx9pjqs.mongodb.net/?retryWrites=true&w=majority'
      
      )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

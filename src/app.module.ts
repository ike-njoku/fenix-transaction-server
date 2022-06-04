import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionGateway } from './transaction.gateway';
import { PdfService } from './pdf/pdf.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
    TransactionsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:dgPgp05dURXOJTOF@cluster0.zx9pjqs.mongodb.net/?retryWrites=true&w=majority'
      ),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TransactionGateway, PdfService],
})
export class AppModule {}

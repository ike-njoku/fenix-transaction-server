import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PdfService } from 'src/pdf/pdf.service';
import { ResponseDto } from 'src/response-dto.interface';
import { TransactionGateway } from 'src/transaction.gateway';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    private transactionGateWay: TransactionGateway,
    private pdfService: PdfService,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
  ) {}
  
  async create(createTransactionDto: CreateTransactionDto) {
    console.log('creating transaction')
    let response: ResponseDto = {
      status: 'fail',
      message: '',
      data: undefined
    }
    console.log('logging this from the service');
    console.log(createTransactionDto);

    let transaction = new this.transactionModel(createTransactionDto);
    transaction.save()
      .then((document) => {
        response.status = 'success';
        response.message = 'Payment Saved';
        response.data = document;
        this.transactionGateWay.handleMessage('transaction', document);
        this.pdfService.drawPdf(document);
        console.log(document);
      })
      .catch((error) => {
        response.message = 'Could not Record Transaction, Please visit your the Bursary Department';
        response.data = error;
      })
  }

  findAll() {
    let transaction = {
        message: 'Test Message',
        Status: 'Paid',
        paymentAmount: 190000,
        transactionRef: 'A12MN79',
        sourceRef: 'A1001',
        paymentRef: 'A1002',
        paymentChannel: 'Web',
        paymentTimestamp: Date.now(),
    }
    return this.pdfService.drawPdf(transaction);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

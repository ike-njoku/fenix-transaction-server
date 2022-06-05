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
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {

    console.log('creating transaction')
    let response: ResponseDto = {
      status: 'fail',
      message: '',
      data: undefined
    }

    let transaction = new this.transactionModel(createTransactionDto);
    await transaction.save()
      .then((document) => {
        response.status = 'success';
        response.message = 'Payment Saved';
        response.data = document;
        console.log('Successfully saved transaction');
      })
      .catch((error) => {
        response.message = 'Could not Record Transaction, Please visit your the Bursary Department';
        response.data = error;
      })

    return response;
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

  async update(updateTransactionDto: UpdateTransactionDto) {
    let response: ResponseDto = {
      status: 'fail',
      message: '',
      data: undefined
    }


    const filter = { transactionRef: updateTransactionDto.transactionRef };
    const newData = {
      message: updateTransactionDto.message,
      Status: updateTransactionDto.Status,
      // transactionRef: updateTransactionDto.transactionRef,
      paymentRef: updateTransactionDto.paymentRef,
      paymentChannel: updateTransactionDto.paymentChannel,
      paymentTimestamp: updateTransactionDto.paymentTimestamp

    };
    const options = { new: true };
    await this.transactionModel.findOneAndUpdate(filter, newData, options)
      .then((document) => {
        console.log(document);
        response.status = 'success';
        response.data = document;
        response.message = "Your transaction has been confirmed";
        console.log('Transaction updated');
        console.log(document);
        this.transactionGateWay.handleMessage('transaction', document);
        try {
          this.pdfService.drawPdf(document);
        } catch (error) {
          console.log('An Error Occured while updating transaction');
          console.log(error);
        };
      })

      .catch((error) => {
        console.log('There was an error in updating the document');
        response.data = error;
        response.message = 'There was an error UPdating the payment';
      })
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

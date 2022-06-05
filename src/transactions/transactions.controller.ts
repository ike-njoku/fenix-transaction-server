import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export interface GetUserTransactions {
  userName: string
}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    console.log('logging this from the controller');
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Post('update')
  update(@Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(updateTransactionDto);
  }


  @Post('my-receipts')
  getMyReceipts(@Body() user: GetUserTransactions) {
    return this.transactionsService.getUserReceipts(user);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}

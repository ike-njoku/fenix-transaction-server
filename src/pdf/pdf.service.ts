import { Injectable } from '@nestjs/common';
import { Transaction, TransactionDocument } from 'src/transactions/transaction.schema';
const PDFDocument = require('pdfkit');
const fs = require('fs');

@Injectable()
export class PdfService {

  drawPdf(transaction: any): any {
    console.log('building pdf')
    console.table(transaction);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`public/output.pdf`));
    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('public/COE_Oro_Logo-removebg-preview.png', {
      fit: [60, 60],
      align: 'center',
      valign: 'center'
    });
    console.log('drawn the image');

    doc
      // .font('fonts/PalatinoBold.ttf')
      .fontSize(25)
      .text('Kwara State Harmonised School Management System. (KSHSMS)', 150, 80)
      .fontSize(18)
      .text('Transaction Reference:', 80, 200)
      .text(transaction.transactionRef, 440, 200)
      .text('Payment Reference:', 80, 230)
      .text(transaction.paymentRef, 440, 230)
      // .text('Barcode Reference:', 80, 260)
      // .text(transaction._id, 150, 290)
      .text('Date:', 80, 310)
      .text(transaction.paymentTimestamp , 440, 310)
    doc.end();
    console.log('Done building pdf');
  }
}

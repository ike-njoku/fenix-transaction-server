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
    doc.pipe(fs.createWriteStream(`public/${transaction._id}.pdf`));
    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('public/COE_Oro_Logo-removebg-preview.png', {
      fit: [60, 60],
      align: 'center',
      valign: 'center'
    });


    console.log('drawn the image');

    doc
      // .font('fonts/PalatinoBold.ttf')
      .fontSize(23)
      .text('Kwara State Harmonised School Management System. (KSHSMS)', 150, 80);

    // doc.image('public/COE_Oro_Logo-removebg-preview.png', {
    //   fit: [60, 60],
    //   align: 'center',
    //   valign: 'center'
    // });
    doc
      .fontSize(14)
      .text('Payer Email', 80, 200)
      .text(transaction.payerEmail, 300, 200)
      .text('Payer Name', 80, 230)
      .text(transaction.payerLastname + ' '+ transaction.payerFirstname, 300, 230)
      .text('Transaction Reference:', 80, 260)
      .text(transaction.paymentRef, 300, 260)
      .text('Institution:', 80, 290)
      .text(transaction.mdaName, 300, 290)
      
      .fontSize(18)
      .text('ITEMS', 80, 320)


      .fontSize(14)
      .text(transaction.revenueName+':', 80, 350)
      .text(transaction.currency+' '+ transaction.paymentAmount, 300, 350)
      .text('Status:', 80, 380)
      .text(transaction.Status, 300, 380)
      .text('Date', 80, 410)
      .text(new Date('2022-06-05T14:28:39.180Z').toString(), 300, 410)

    doc.end();
    console.log('Done building pdf');
  }
}

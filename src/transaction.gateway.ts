import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(80,
  {
    cors: ['http://localhost:4200/', 'https://demo-fenix-sms.herokuapp.com/']
  }
)
export class TransactionGateway {
  @WebSocketServer()
  server;
  
  @SubscribeMessage('transaction')
  handleMessage(client: any, payload: any): string {
    let emitMessage = this.server.emit('transacton', payload);
    if (emitMessage) {
      console.log('emitted')
    } else console.log('did not emit')
    return payload;
  }
}

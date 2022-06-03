import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(
  {
    cors: ['http://localhost:4200/', 'https://demo-fenix-sms.herokuapp.com/']
  }
)
export class TransactionGateway {
  @WebSocketServer()
  server;
  
  @SubscribeMessage('transaction')
  handleMessage(client: any, payload: any): string {
    let emitMessage = this.server.emit('transaction', payload);
    if (emitMessage) {
      console.log('emitted')
    } else console.log('did not emit')
    return payload;
  }
}

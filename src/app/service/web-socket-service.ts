import {Injectable} from "@angular/core";
import {ChatMessageModel} from "../model/chat-message-model";

@Injectable()
export class WebSocketService {
  webSocket : WebSocket | any;
  chatMessages : ChatMessageModel[] = [];
  constructor(){
  }

  openWebSocket() {
    this.webSocket = new WebSocket(`ws://localhost:8081/chat`);
    this.webSocket.onopen = (event : any) => {
      console.log('Open' , event);
    };

    this.webSocket.onmessage = (event : any) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
    };

    this.webSocket.onclose = (event : any) => {
      console.log("close", event)
    };
  }

  sendMessage(chatMessage : ChatMessageModel) {
    this.webSocket.send(JSON.stringify(chatMessage));

  }

  closeWebSocket() {
    this.webSocket.close();
  }
}

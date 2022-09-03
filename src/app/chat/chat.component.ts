import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebSocketService} from "../service/web-socket-service";
import {ChatMessageModel} from "../model/chat-message-model";
import {AuthService} from "../service/auth-service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  targetUsername : string | any = '';
  username : string = '';
  message : string = '';
  constructor(private activatedRouter : ActivatedRoute,
              public webSocketService : WebSocketService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap
      .subscribe((paramMap) => {
        this.targetUsername = paramMap.get('username');
        this.authService.username.subscribe((username) => username);
      });

    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage() {
    const messageModel = new ChatMessageModel(this.username, this.targetUsername, this.message);
    this.webSocketService.sendMessage(messageModel);
  }



}

export class ChatMessageModel {
  constructor(public sourceUsername : string,
              public targetUsername : string,
              public message : string) {
  }
}

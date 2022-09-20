export class CommentResponseModel {
  constructor(public id : number,
  public content : string,
  public createdAt : string,
  public authorUsername : string,
  public postId : number,
  public profileImageLink : string,
  public commentImageLink : string ) {
  }
}

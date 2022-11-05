export class PostModel {
  constructor( public id : number,
  public title : string,
  public content : string,
  public voteCount : number,
  public createdAt : string,
  public lastUpdated : string,
  public subredditName : string,
  public authorUsername : string,
  public commentsNumber : number,
  public likedStatus : number,
  public profileImageLink : string,
  public postImageLink : string) {
  }
}

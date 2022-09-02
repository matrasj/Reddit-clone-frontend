export class PostModel {
  constructor( public id : number,
  public title : string,
  public url : string,
  public content : string,
  public voteCount : number,
  public createdAt : string,
  public lastUpdated : string,
  public subredditName : string,
  public authorUsername : string,
  public commentsNumber : number,
  public likedStatus : number,
  public profileImagePath : string,
  public postImagePath : string) {
  }
}

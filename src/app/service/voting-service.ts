import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class VotingService {
  private API_VOTING_URL: string = "http://localhost:8081/api/v1/votes";
  constructor(private httpClient : HttpClient) {
  }

  public votePost(voteValue : number, postId : number, username : string) : Observable<any> {
    return this.httpClient.post(`${this.API_VOTING_URL}`, {
      voteValue : voteValue,
      postId : postId,
      authorUsername : username
    })
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentResponseModel} from "../model/comment-response-model";
import {PostModel} from "../model/post-model";
import {CommentRequestModel} from "../model/comment-request-model";

@Injectable()
export class CommentService {
  private API_COMMENT_URL : string = "http://localhost:8081/api/v1/comments/post/id/"
  private API_CREATE_COMMENT_URL: string = "http://localhost:8081/api/v1/comments/post/id/";
  constructor(private httpClient : HttpClient) {
  }

  public getCommentsByPostId(postId : number, pageNumber : number, pageSize : number) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_COMMENT_URL}${postId}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  public addCommentToPost(commentRequest : CommentRequestModel, commentImage : File, postId : number) : Observable<string>{
    const data = new FormData();
    data.append("authorUsername", commentRequest.authorUsername);
    data.append("content", commentRequest.content);

    if (commentImage) {
      data.append("file", commentImage);
    }
    return this.httpClient.post(`${this.API_CREATE_COMMENT_URL}${postId}`, data, {
      responseType : 'text'
    });
  }
}

interface GetResponse {
  content : CommentResponseModel[],
  totalElements : number,
  totalPages : number,
  size : number,
  number : number,
}

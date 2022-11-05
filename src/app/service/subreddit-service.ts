import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubredditModel} from "../model/subreddit/subreddit-model";
import {SubredditRequestModel} from "../model/subreddit/subreddit-request-model";
import {PostModel} from "../model/post/post-model";

@Injectable()
export class SubredditService {
  private API_SUBREDDIT_LIMIT_URL : string = "http://localhost:8081/api/v1/sub-reddits/limit?limit="
  private API_SUBREDDIT_POST_URL : string = "http://localhost:8081/api/v1/sub-reddits";
  private API_SUBREDDIT_ALL_URL : string  = "http://localhost:8081/api/v1/sub-reddits/all";
  private API_SUBREDDIT_PAGINATION_URL: string = "http://localhost:8081/api/v1/sub-reddits";
  private API_SUBREDDIT_PAGINATION_KEYWORD_URL: string = "http://localhost:8081/api/v1/sub-reddits/findByTitleOrDescriptionContainingKeyword";
  constructor(private httpClient :  HttpClient) {
  }

  getSubredditsWithLimit(limit : number) : Observable<SubredditModel[]> {
    return this.httpClient.get<SubredditModel[]>(`${this.API_SUBREDDIT_LIMIT_URL}${limit}`);
  }

  createSubreddit(subredditRequest : SubredditRequestModel) : Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>(`${this.API_SUBREDDIT_POST_URL}`, subredditRequest);
  }

  // TO CHANGE BUSINESS LOGIC
  getAllSubreddits() : Observable<SubredditModel[]> {
    return this.httpClient.get<SubredditModel[]>(`${this.API_SUBREDDIT_ALL_URL}`);
  }

  getSubredditsWithPagination(pageNumber : number, pageSize : number) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_SUBREDDIT_PAGINATION_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getSubredditsWithPaginationByKeyword(pageNumber: number, pageSize: number, keyword: string) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_SUBREDDIT_PAGINATION_KEYWORD_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`);
  }
}

interface GetResponse {
  content : PostModel[],
  totalElements : number,
  totalPages : number,
  size : number,
  number : number,
}

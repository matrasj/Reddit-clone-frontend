import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "../model/post/post-model";
import {PostRequestModel} from "../model/post/post-request-model";
import {F} from "@angular/cdk/keycodes";

@Injectable()
export class PostService {
  private API_POSTS_PAGE_URL: string = "http://localhost:8081/api/v1/posts";
  private API_CREATE_POST_URL : string = "http://localhost:8081/api/v1/posts?subredditId="
  private API_GET_POST : string = "http://localhost:8081/api/v1/posts/id/"
  private API_POSTS_BY_USERNAME_URL: string = "http://localhost:8081/api/v1/posts/findByAuthorUsername?";
  private API_POSTS_BY_USERNAME_AND_KEYWORD: string = "http://localhost:8081/api/v1/posts/findByAuthorUsernameAndKeyword?";
  private API_DELETE_POST_URL : string = "http://localhost:8081/api/v1/posts/delete/";
  constructor(private httpClient : HttpClient) {
  }

  getPostsPage(pageNumber : number, pageSize : number) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_POSTS_PAGE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  getPostsBySubredditTitle(pageNumber : number, pageSize : number, subredditTile : string) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_POSTS_PAGE_URL}/findBySubredditTitle?pageNumber=${pageNumber}&pageSize=${pageSize}&subredditTitle=${subredditTile}`)
  }

  createPost(postRequest : PostRequestModel, postImage : File, subredditId : number) : Observable<string> {
    const data = new FormData();
    data.append("title", postRequest.title);
    data.append("content", postRequest.content);

    if (postImage) {
        data.append("file", postImage);
    }

    return this.httpClient.post(`${this.API_CREATE_POST_URL}${subredditId}`, data
    , {
      responseType : 'text'
    });
  }

  getPostById(postId : number) : Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${this.API_GET_POST}${postId}`);
  }

  getPostsByUsername(username : string, pageNumber : number, pageSize : number) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_POSTS_BY_USERNAME_URL}pageNumber=${pageNumber}&pageSize=${pageSize}&username=${username}`)
  }

  getAttributesAfterLiked (isPostLiked : boolean, isPostDisliked : boolean)  {
    if (isPostLiked && !isPostDisliked) {
      isPostLiked = false;
    } else if (!isPostLiked && isPostDisliked){
      isPostLiked = true;
      isPostDisliked = false;
    } else {
      isPostLiked = true;
    }

    return [isPostLiked, isPostDisliked];
  }

  getAttributesAfterDisliked (isPostLiked : boolean, isPostDisliked : boolean) {
    if (isPostDisliked && !isPostLiked) {
      isPostDisliked = false;
    } else if (isPostLiked && !isPostDisliked) {
      isPostLiked = false;
      isPostDisliked = true;
    } else {
      isPostDisliked = true;
    }

    return [isPostLiked, isPostDisliked];
  }

  getAttributesAfterLoading(isPostLiked : boolean, isPostDisliked : boolean, post : PostModel) {
    switch (post.likedStatus) {
      case VoteType.VOTE_UP.valueOf() : {
        isPostLiked = true;
      }  break;

      case VoteType.VOTE_DOWN.valueOf() : {
        isPostDisliked = true;
      } break;

      case 0: default: {
        isPostLiked = false;
        isPostDisliked = false;
      } break;
    }

    return [isPostLiked, isPostDisliked];
  }

  getPostsByUsernameAndKeyword(username : string,
                               keyword : string,
                               pageNumber : number,
                               pageSize : number) : Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(`${this.API_POSTS_BY_USERNAME_AND_KEYWORD}username=${username}&keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  deletePostById(postId : number)  : Observable<string>{
    return this.httpClient.get(`${this.API_DELETE_POST_URL}${postId}`, {
      responseType : 'text'
    });
  }

}

interface GetResponse {
  content : PostModel[],
  totalElements : number,
  totalPages : number,
  size : number,
  number : number,
}

enum VoteType {
  VOTE_UP = 1, VOTE_DOWN = -1
}

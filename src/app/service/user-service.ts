import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user/user-model";
import {UserSearchModel} from "../model/user/user-search-model";
import {BiographyModel} from "../model/biography-model";

@Injectable()
export class UserService {
  private API_USER_URL : string = "http://localhost:8081/api/v1/users/username/";
  private API_UPLOAD_PROFILE_IMAGE_URL: string = "http://localhost:8081/api/v1/users/profile-image";
  private API_GET_USERNAMES: string = "http://localhost:8081/api/v1/users/usernames?";
  private API_SET_BIOGRAPHY_URL: string = "http://localhost:8081/api/v1/users/biography";
  private API_DELETE_BIOGRAPHY_URL: string = "http://localhost:8081/api/v1/users/biography/delete";
  constructor(private httpClient : HttpClient) {
  }

  public getUserData(username : string) : Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.API_USER_URL}${username}`);
  }

  public uploadProfileImage(profileImage : File | any) : Observable<string> {
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    return this.httpClient.post(`${this.API_UPLOAD_PROFILE_IMAGE_URL}`, formData, {
      responseType : 'text'
    });
  }

  public getUsersUsernamesByKeyword(keyword : string) : Observable<UserSearchModel[]> {
    return this.httpClient.get<UserSearchModel[]>(`${this.API_GET_USERNAMES}username=${keyword}`);
  }

  public setBiography(biography : string) : Observable<string> {
    return this.httpClient.post(`${this.API_SET_BIOGRAPHY_URL}`, biography, {
      responseType : 'text',
    });
  }

  public deleteBiography() : Observable<string> {
    return this.httpClient.get(`${this.API_DELETE_BIOGRAPHY_URL}`, {
      responseType : 'text'
    })
  }
}

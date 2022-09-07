import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocialMediaLinkModel} from "../model/social-media-link-model";
import {Observable} from "rxjs";

@Injectable()
export class SocialMediaLinkService {
  private API_SOCIAL_MEDIA_URL : string = "http://localhost:8081/api/v1/social-media-links";
  private API_SOCIAL_MEDIA_DELETE_URL: string = "http://localhost:8081/api/v1/social-media-links/delete";
  constructor(private httpClient : HttpClient) {
  }

  createSocialLink(socialMediaLink : SocialMediaLinkModel) : Observable<string>{
    return this.httpClient.post(`${this.API_SOCIAL_MEDIA_URL}`, socialMediaLink, {
      responseType : 'text'
    });
  }

  deleteSocialMediaLink(linkId : number) : Observable<string> {
    return this.httpClient.get(`${this.API_SOCIAL_MEDIA_DELETE_URL}/${linkId}`, {
      responseType : 'text'
    })
  }

  updateSocialMediaLink(socialMediaLink : SocialMediaLinkModel) : Observable<string> {
    return this.httpClient.put(`${this.API_SOCIAL_MEDIA_URL}`, socialMediaLink, {
      responseType : 'text'
    });
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocialMediaLinkModel} from "../model/social-media-link-model";
import {Observable} from "rxjs";

@Injectable()
export class SocialMediaLinkService {
  private API_SOCIAL_MEDIA_URL : string = "http://localhost:8081/api/v1/social-media-links";
  constructor(private httpClient : HttpClient) {
  }

  createSocialLink(socialMediaLink : SocialMediaLinkModel) : Observable<string>{
    return this.httpClient.post(`${this.API_SOCIAL_MEDIA_URL}`, socialMediaLink, {
      responseType : 'text'
    });
  }
}

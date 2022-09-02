import {SocialMediaLinkModel} from "./social-media-link-model";

export class UserModel {
  constructor(public email : string,
              public username : string,
              public postsNumber : number,
              public commentsNumber : number,
              public profileImagePath : string,
              public biography : string,
              public socialMediaLinks : SocialMediaLinkModel[]) {
  }
}

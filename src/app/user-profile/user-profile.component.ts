import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth-service";
import {UserService} from "../service/user-service";
import {UserModel} from "../model/user-model";
import {PostService} from "../service/post-service";
import {PostModel} from "../model/post-model";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateSocialMediaLinkPopupComponent
} from "./create-social-media-link-popup/create-social-media-link-popup.component";
import {CreateBiographyPopupComponent} from "./create-biography-popup/create-biography-popup.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username : string | any = '';
  user : UserModel | any;
  posts : PostModel[] = [];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 4;
  pageNumber : number = 1;
  ownerAccount : boolean = false;
  DEFAULT_PROFILE_IMAGE : string = "assets/images/profile-images/default-image.png";
  constructor(private authService : AuthService,
              private userService : UserService,
              private postService : PostService,
              public activatedRoute : ActivatedRoute,
              private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.username = paramMap.get('username');

        this.authService.username.subscribe((currentUserUsername) => {
          currentUserUsername === this.username ? this.ownerAccount = true : this.ownerAccount = false;

          this.userService.getUserData(this.username)
            .subscribe((user) => {
              this.user = user;
              this.fetchUserPosts(this.username);
            });
        });
      })
  }

  onBiographyCreating() {
    this.dialogRef.open(CreateBiographyPopupComponent);
  }

  openCreateSocialMediaLinkPopup() {
    this.dialogRef.open(CreateSocialMediaLinkPopupComponent);
  }

  private fetchUserPosts(username: string) {
    return this.postService.getPostsByUsername(username, this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleResponse(res));
  }

  private handleResponse(data : any) {
    this.posts = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;
  }

  upperCaseFirstLetter(word : string) {
    return word.charAt(0).toUpperCase().concat(word.slice(1).toLowerCase());
  }
}

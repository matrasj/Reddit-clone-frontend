import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../model/user-model";
import {PostModel} from "../../model/post-model";
import {AuthService} from "../../service/auth-service";
import {UserService} from "../../service/user-service";
import {PostService} from "../../service/post-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  username : string | any = '';
  ownerAccount : boolean = false;
  user : UserModel | any;
  posts : PostModel[] = [];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 3;
  pageNumber : number = 1;
  keyword : string = '';
  constructor( private authService : AuthService,
               private userService : UserService,
               private postService : PostService,
               private activatedRoute : ActivatedRoute) { }

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
      });
  }

  onPageChange() {
    this.fetchUserPosts(this.username);
  }

  private fetchUserPosts(username: string) {
    return this.postService.getPostsByUsername(username, this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleResponse(res));
  }

  onPostsSearching(event : Event) {
    event.preventDefault();

    this.postService.getPostsByUsernameAndKeyword(this.username, this.keyword, this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleResponse(res));
  }

  private handleResponse(data : any) {
    this.posts = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;
  }

}

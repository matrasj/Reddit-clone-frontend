import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {Event, Router} from "@angular/router";
import {UserService} from "../../service/user-service";
import {UserModel} from "../../model/user/user-model";
import {UserSearchModel} from "../../model/user/user-search-model";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  keyword : string = '';
  isAuthenticated : boolean = false;
  username : any;
  currentUser : UserModel | any;
  DEFAULT_IMAGE_PATH : string = "assets/images/profile-images/default-image.png";
  isShowingResults : boolean = false;

  searchedUsers : UserSearchModel[] = [];
  constructor(private authService : AuthService,
              private router : Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated
      .subscribe((auth) => this.isAuthenticated = auth);

    this.authService.username
      .subscribe((username) => {
        this.username = username;
        if (this.isAuthenticated) {
          this.userService.getUserData(this.username)
            .subscribe((userModel) => this.currentUser = userModel);
        }
      });

    window.addEventListener('click', (e) => {
      this.isShowingResults = false;
    })
  }

  onWriting(event : Event | any) {
    this.isShowingResults = true;
    const keyword : string = event.target.value;
    this.userService.getUsersUsernamesByKeyword(keyword)
      .subscribe((users) => {
        this.searchedUsers = users;
      })

  }
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
    window.location.reload();
  }




}

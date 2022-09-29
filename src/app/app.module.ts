import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./service/auth-service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {NgToastModule} from "ng-angular-popup";
import {TokenInterceptor} from "./config/token-interceptor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';

import {PostService} from "./service/post-service";
import {SubredditService} from "./service/subreddit-service";
import { CreateSubredditComponent } from './components/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import {AuthGuard} from "./config/auth-guard";
import {EditorModule} from "@tinymce/tinymce-angular";
import { PostComponent } from './components/post/post.component';
import {DateService} from "./service/date-service";
import { SinglePostViewComponent } from './components/single-post-view/single-post-view.component';
import {CommentService} from "./service/comment-service";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxSpinnerModule} from "ngx-spinner";
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "./service/user-service";
import {VotingService} from "./service/voting-service";
import { UserPostsComponent } from './components/user-profile/user-posts/user-posts.component';
import { UserSettingsComponent } from './components/user-profile/user-settings/user-settings.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { CreateSocialMediaLinkPopupComponent } from './components/user-profile/create-social-media-link-popup/create-social-media-link-popup.component';
import { CreateBiographyPopupComponent } from './components/user-profile/create-biography-popup/create-biography-popup.component';
import {SocialMediaLinkService} from "./service/social-media-link-service";
import { ConfirmPostDeletionComponent } from './components/confirm-post-deletion/confirm-post-deletion.component';
import {
  EditSocialMediaLinkPopupComponent
} from "./components/user-profile/edit-social-media-link-popup/edit-social-media-link-popup.component";
import {ActionPanelComponent} from "./components/action-panel/action-panel.component";
import {SubredditsPopupComponent} from "./components/action-panel/subreddits-popup/subreddits-popup.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";


const routes = [
  { path : "login", component : LoginPageComponent},
  { path : "register", component : RegisterPageComponent},
  { path : "", component : HomeComponent, children : [
      { path : "", component : PostsComponent},
      { path : "post-view/:id", component: SinglePostViewComponent}
    ]},
  { path : "create-subreddit", component : CreateSubredditComponent, canActivate : [AuthGuard]},
  { path : "create-post", component : CreatePostComponent, canActivate : [AuthGuard]},
  { path : "search/subreddit", component:  HomeComponent, children : [
      { path : "", component : PostsComponent},
      { path : "post-view/:id", component: SinglePostViewComponent}
    ]},
  { path : 'profile/:username', component: UserProfileComponent, children: [
      { path : '', component: UserPostsComponent},
      { path : 'settings', component: UserSettingsComponent}
    ]},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomeComponent,
    PostsComponent,
    SinglePostViewComponent,
    ActionPanelComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    PostComponent,
    SinglePostViewComponent,
    UserProfileComponent,
    SubredditsPopupComponent,
    UserPostsComponent,
    UserSettingsComponent,
    EditPostComponent,
    CreateSocialMediaLinkPopupComponent,
    CreateBiographyPopupComponent,
    ConfirmPostDeletionComponent,
    EditSocialMediaLinkPopupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgToastModule,
    NgbModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    EditorModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [AuthService, ToastrService,
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true},
  PostService,
    SubredditService,
    AuthGuard,
    DateService,
    CommentService,
    UserService,
    VotingService,
    SocialMediaLinkService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

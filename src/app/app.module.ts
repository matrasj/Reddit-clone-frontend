import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./service/auth-service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {NgToastModule} from "ng-angular-popup";
import {TokenInterceptor} from "./interceptor/token-interceptor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { ActionPanelComponent } from './action-panel/action-panel.component';
import {PostService} from "./service/post-service";
import {SubredditService} from "./service/subreddit-service";
import { CreateSubredditComponent } from './create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './create-post/create-post.component';
import {AuthGuard} from "./config/auth-guard";
import {EditorModule} from "@tinymce/tinymce-angular";
import { PostComponent } from './post/post.component';
import {DateService} from "./service/date-service";
import { SinglePostViewComponent } from './single-post-view/single-post-view.component';
import {CommentService} from "./service/comment-service";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxSpinnerModule} from "ngx-spinner";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubredditsPopupComponent } from './action-panel/subreddits-popup/subreddits-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "./service/user-service";
import {VotingService} from "./service/voting-service";
import { UserPostsComponent } from './user-profile/user-posts/user-posts.component';
import { UserSettingsComponent } from './user-profile/user-settings/user-settings.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { CreateSocialMediaLinkPopupComponent } from './user-profile/create-social-media-link-popup/create-social-media-link-popup.component';
import { CreateBiographyPopupComponent } from './user-profile/create-biography-popup/create-biography-popup.component';
import {SocialMediaLinkService} from "./service/social-media-link-service";
import { ChatComponent } from './chat/chat.component';
import {WebSocketService} from "./service/web-socket-service";
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { ConfirmPostDeletionComponent } from './confirm-post-deletion/confirm-post-deletion.component';
import {
  EditSocialMediaLinkPopupComponent
} from "./user-profile/edit-social-media-link-popup/edit-social-media-link-popup.component";

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
  { path : "chat/:username", component: ChatComponent},




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
    ChatComponent,
    RetrievePasswordComponent,
    ConfirmPostDeletionComponent,
    EditSocialMediaLinkPopupComponent


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
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
    SocialMediaLinkService,
    WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

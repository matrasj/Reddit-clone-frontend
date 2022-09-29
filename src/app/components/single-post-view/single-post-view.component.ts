import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostModel} from "../../model/post-model";
import {PostService} from "../../service/post-service";
import {DateService} from "../../service/date-service";
import {AuthService} from "../../service/auth-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../service/comment-service";
import {CommentResponseModel} from "../../model/comment-response-model";
import {CommentRequestModel} from "../../model/comment-request-model";
import {Toast, ToastrService} from "ngx-toastr";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {VotingService} from "../../service/voting-service";

@Component({
  selector: 'app-single-post-view',
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css']
})
export class SinglePostViewComponent implements OnInit {
  selectedCommentImage : File | any;
  post : PostModel | any;
  username : any = '';
  postFormGroup : FormGroup | any;
  comments : CommentResponseModel[] = [];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 5;
  pageNumber : number = 1;

  isPostLiked : boolean = false;
  isPostDisliked : boolean = false;
  isLogged : boolean = false;
  DEFAULT_PROFILE_IMAGE: string = "assets/images/profile-images/default-image.png";

  constructor(private activatedRoute : ActivatedRoute,
              private postService : PostService,
              private dateService : DateService,
              private commentService : CommentService,
              private authService : AuthService,
              private formBuilder : FormBuilder,
              private toastService : ToastrService,
              private router : Router,
              private votingService : VotingService,
              private toast : ToastrService) { }

  ngOnInit(): void {
    this.initData();

    this.postFormGroup = this.formBuilder.group({
      post : this.formBuilder.group({
          content : new FormControl('', [Validators.required, Validators.maxLength(250)])
      })
    })
  }

  onFileSelected(event : Event | any) {
    this.selectedCommentImage = event.target.files[0];
  }

  getFormattedDate(date : string) {
    return this.dateService.getFormattedDate(date);
  }

  get content() {
    return this.postFormGroup.get('post').get('content');
  }

  private fetchComments(postId: number) {
    this.commentService.getCommentsByPostId(postId, this.pageNumber - 1, this.pageSize)
      .subscribe((data) => {
        this.handleResponse(data);
      });
  }

  onCommentCreating(post : PostModel) {
    if (this.postFormGroup.invalid) {
      this.postFormGroup.markAllAsTouched();
    } else {
      this.commentService.addCommentToPost(new CommentRequestModel(
        this.content.value,
        this.username
      ),
        this.selectedCommentImage,
        post.id)
        .subscribe((res) => {
          if (res) {
            this.selectedCommentImage = null;
            this.postFormGroup.reset();
            this.toastService.success("Successfully created comment", "Success!");
            this.fetchComments(post.id);
            window.location.reload();
          } else {
            this.toastService.error("Something gone wrong", "Error");
          }
        })
    }
  }

  likePost(post : PostModel) {
    if (this.isLogged) {
      [this.isPostLiked, this.isPostDisliked] = this.postService.getAttributesAfterLiked(this.isPostLiked, this.isPostDisliked);

      this.votingService.votePost(VoteType.VOTE_UP.valueOf(), post.id)
        .subscribe((res) => post.voteCount = res.score);
    } else {
      this.router.navigate(["/login"]);
      this.toast.info("Only logged users can do this");
    }
  }

  dislikePost(post : PostModel) {
    if (this.isLogged) {
      [this.isPostLiked, this.isPostDisliked] = this.postService.getAttributesAfterDisliked(this.isPostLiked, this.isPostDisliked);

      this.votingService.votePost(VoteType.VOTE_DOWN.valueOf(), post.id)
        .subscribe((res) => post.voteCount = res.score);
    } else {
      this.router.navigate(["/login"]);
      this.toast.info("Only logged users can do this");
    }
  }

  private handleResponse(data : any) {
    this.comments = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;
  }

  onPageChange() {
    this.fetchComments(this.post.id);
  }


  private initData() {
    this.authService.isAuthenticated
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.isLogged = isAuthenticated;
        }
      });

    this.username = this.authService.getUsername();

    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.postService.getPostById(Number(paramMap.get('id')))
          .subscribe((post) => {
            this.post = post;

            this.fetchComments(post.id);
            [this.isPostLiked, this.isPostDisliked] = this.postService.getAttributesAfterLoading(this.isPostLiked, this.isPostDisliked, this.post);
          });
      });
  }


}

enum VoteType {
  VOTE_UP = 1, VOTE_DOWN = -1
}

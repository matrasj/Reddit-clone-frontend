import {Component, Input, OnInit} from '@angular/core';
import {DateService} from "../service/date-service";
import {PostModel} from "../model/post-model";
import {VotingService} from "../service/voting-service";
import {AuthService} from "../service/auth-service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {PostService} from "../service/post-service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isPostLiked : boolean = false;
  isPostDisliked : boolean = false;
  isLogged : boolean = false;
  @Input() post : PostModel | any;

  public DEFAULT_IMAGE_PATH : string = "assets/images/profile-images/default-image.png";
  constructor(private dateService : DateService,
              private votingService : VotingService,
              private authService : AuthService,
              private toast : ToastrService,
              private router : Router,
              private postService : PostService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.isLogged = isAuthenticated;
          [this.isPostLiked, this.isPostDisliked] = this.postService.getAttributesAfterLoading(this.isPostLiked, this.isPostDisliked, this.post);
        }
      });
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


  getFormattedDate(date : string) {
    return this.dateService.getFormattedDate(date);
  }

}
enum VoteType {
  VOTE_UP = 1, VOTE_DOWN = -1
}


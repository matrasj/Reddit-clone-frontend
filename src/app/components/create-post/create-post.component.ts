import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubredditService} from "../../service/subreddit-service";
import {SubredditModel} from "../../model/subreddit/subreddit-model";
import {PostService} from "../../service/post-service";
import {PostRequestModel} from "../../model/post/post-request-model";
import {ToastrService} from "ngx-toastr";
import {Event, Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postFormGroup : FormGroup | any;
  selectedPostImage : File | any;
  subreddits : SubredditModel[] = [];

  constructor(private formBuilder : FormBuilder,
              private subredditService : SubredditService,
              private postService : PostService,
              private toastService : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
    this.postFormGroup = this.formBuilder.group({
      post : this.formBuilder.group({
        title : new FormControl('', [Validators.required, Validators.minLength(2)]),
        content : new FormControl('', [Validators.required]),
        subreddit : new FormControl('', [Validators.required]),
      })
    });

    this.subredditService.getAllSubreddits()
      .subscribe((subreddits) => this.subreddits = subreddits);

  }

  onPostCreating() {
    if (this.postFormGroup.invalid) {
      this.postFormGroup.markAllAsTouched();
    } else {
      const subreddit : any = this.subreddits.find((subreddit) => subreddit.title === this.subreddit.value);
      this.postService.createPost(new PostRequestModel(
        this.title.value,
        this.content.value
      ), this.selectedPostImage, subreddit.id)
        .subscribe((res) => {
          this.toastService.success(res, "Success");
          this.router.navigate(['']);
        }, error => {
          this.toastService.error("Something went wrong")
        });
    }
  }

  onFileSelected(event : Event | any) {
    this.selectedPostImage = event.target.files[0];
  }

  get title() {
    return this.postFormGroup.get('post').get('title');
  }

  get content() {
    return this.postFormGroup.get('post').get('content');
  }

  get subreddit() {
    return this.postFormGroup.get('post').get('subreddit');
  }

}

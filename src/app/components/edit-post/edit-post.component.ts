import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {PostService} from "../../service/post-service";
import {ActivatedRoute} from "@angular/router";
import {PostModel} from "../../model/post-model";
import {AuthService} from "../../service/auth-service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  currentPost : PostModel | any;
  username : String | any = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private postService : PostService) {
    this.getPostById(data.id);
  }

  ngOnInit(): void {

  }

  private getPostById(id : number) {
    this.postService.getPostById(id)
      .subscribe((post) => this.currentPost = post);
  }



}

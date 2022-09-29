import { Component, OnInit } from '@angular/core';
import {PostService} from "../../service/post-service";
import {PostModel} from "../../model/post-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts : PostModel[] = [];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 5;
  pageNumber : number = 1;
  constructor(private postService : PostService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }

  onPageChange() {
    this.initData();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  private handleResponse(data : any) {
    this.posts = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;

  }


  private initData() {
    this.activatedRoute.queryParams.subscribe((queryParamsMap : any ) => {
      if (queryParamsMap.subredditTitle) {
        this.postService.getPostsBySubredditTitle(this.pageNumber - 1, this.pageSize, queryParamsMap.subredditTitle)
          .subscribe(res => this.handleResponse(res));
      }
      else {
        this.postService.getPostsPage(this.pageNumber - 1, this.pageSize)
          .subscribe((res) => this.handleResponse(res));
      }
    });
  }
}

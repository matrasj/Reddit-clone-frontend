import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SubredditModel} from "../../../model/subreddit/subreddit-model";
import {SubredditService} from "../../../service/subreddit-service";
import {DateService} from "../../../service/date-service";

@Component({
  selector: 'app-subreddits-popup',
  templateUrl: './subreddits-popup.component.html',
  styleUrls: ['./subreddits-popup.component.css']
})
export class SubredditsPopupComponent implements OnInit {
  subreddits : SubredditModel[] = [];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 4;
  pageNumber : number = 1;
  keyword : string = '';

  constructor(private subredditService : SubredditService,
              private dialogRef : MatDialog,
              private dateService : DateService,
              private router : Router) { }

  ngOnInit(): void {
    this.initData();
  }

  closeModal() {
    this.dialogRef.closeAll();
  }

  getFormattedDate(date : string) {
    return this.dateService.getFormattedDate(date);
  }

  onSubredditClicking(subreddit : SubredditModel) {
    this.router.navigate(['search/subreddit'], { queryParams : {
        subredditTitle : subreddit.title
    }});
    this.dialogRef.closeAll();
  }

  onSearchingForSubreddits(event : any) {
    event.preventDefault();
    this.subredditService.getSubredditsWithPaginationByKeyword(this.pageNumber - 1, this.pageSize, this.keyword)
      .subscribe((res) => this.handleRequest(res));
  }

  onPageChange() {
    this.initData();
  }

  private handleRequest(res : any) {
    this.subreddits = res.content;
    this.totalElements = res.totalElements;
    this.totalPages = res.totalPages;
    this.pageNumber = res.number + 1;
    this.pageSize = res.size;
  }

  private initData() {
    this.subredditService.getSubredditsWithPagination(this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleRequest(res));
  }
}

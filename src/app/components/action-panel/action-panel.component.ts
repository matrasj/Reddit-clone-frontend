import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {SubredditsPopupComponent} from "./subreddits-popup/subreddits-popup.component";
import {SubredditModel} from "../../model/subreddit/subreddit-model";
import {SubredditService} from "../../service/subreddit-service";

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.css']
})
export class ActionPanelComponent implements OnInit {
  subreddits : SubredditModel[] = [];
  private SUBREDDIT_LIMIT : number = 4;
  constructor(private subredditService : SubredditService,
              private router : Router,
              private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.subredditService.getSubredditsWithLimit(this.SUBREDDIT_LIMIT)
      .subscribe((subreddits) => this.subreddits = subreddits);
  }

  onSubredditClicking(subreddit : SubredditModel) {
    this.router.navigate(['search/subreddit'], { queryParams : {
      subredditTitle : subreddit.title
      }});
  }

  onViewAllClicking() {
    this.dialogRef.open(SubredditsPopupComponent);
  }

}

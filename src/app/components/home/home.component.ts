import { Component, OnInit } from '@angular/core';
import {PostService} from "../../service/post-service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {

  }

}

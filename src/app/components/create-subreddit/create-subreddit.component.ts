import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SubredditService} from "../../service/subreddit-service";
import {SubredditRequestModel} from "../../model/subreddit-request-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  subredditFormGroup : FormGroup | any;
  constructor(private formBuilder : FormBuilder,
              private toastService : ToastrService,
              private subredditService : SubredditService,
              private router : Router) { }

  ngOnInit(): void {
    this.subredditFormGroup = this.formBuilder.group({
      subreddit : this.formBuilder.group({
        title : new FormControl('', [Validators.required, Validators.minLength(3)]),
        description : new FormControl('', [Validators.required, Validators.minLength(5)])
      })
    })
  }

  get title() {
    return this.subredditFormGroup.get('subreddit').get('title');
  }

  get description() {
    return this.subredditFormGroup.get('subreddit').get('description');
  }

  onSubredditCreating() {
    if (this.subredditFormGroup.invalid) {
      this.subredditFormGroup.markAllAsTouched();
    } else {
      this.subredditService.createSubreddit(
        new SubredditRequestModel(
          this.title.value,
          this.description.value
        )).subscribe((res) => {
        if (res) {
          this.toastService.success("Created subreddit: " + res.title, "Success!");
          this.router.navigate(['/']);
        } else {
          this.toastService.error("Something gone wrong", "Error");
        }
      })

      this.subredditFormGroup.reset();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user-service";
import {Event, Router} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  selectedProfileImage : File | any;
  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onImageUploading(event : Event | any) {
    event.preventDefault();

    this.userService.uploadProfileImage(this.selectedProfileImage)
      .subscribe((res) => {
        //

      }, error => {
        console.log(error);
      });

    window.location.reload();
  }


  onFileSelected(event : Event | any) {
    this.selectedProfileImage = event.target.files[0];
  }

}

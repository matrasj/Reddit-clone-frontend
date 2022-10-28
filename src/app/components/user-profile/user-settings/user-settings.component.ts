import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user-service";
import {Event, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  selectedProfileImage : File | any;
  constructor(private userService : UserService,
              private toastrService : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onImageUploading(event : Event | any) {
    event.preventDefault();
    this.userService.uploadProfileImage(this.selectedProfileImage)
      .subscribe((res) => {
        location.reload();
        this.toastrService.success(res);


      }, error => {
        this.toastrService.error("Error")
      });
  }


  onFileSelected(event : Event | any) {
    this.selectedProfileImage = event.target.files[0];
  }

}

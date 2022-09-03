import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user-service";
import {ToastrService} from "ngx-toastr";
import {BiographyModel} from "../../model/biography-model";

@Component({
  selector: 'app-create-biography-popup',
  templateUrl: './create-biography-popup.component.html',
  styleUrls: ['./create-biography-popup.component.css']
})
export class CreateBiographyPopupComponent implements OnInit {

  biographyFormGroup : FormGroup | any;
  constructor(private dialogRef : MatDialog,
              private formBuilder : FormBuilder,
              private userService : UserService,
              private toastService : ToastrService) { }

  ngOnInit(): void {
    this.biographyFormGroup = this.formBuilder.group({
      biography : new FormControl('', [Validators.maxLength(100), Validators.required])
    })
  }

  get biography() {
    return this.biographyFormGroup.get('biography');
  }

  closePopup() {
    this.dialogRef.closeAll();
  }

  onBiographySetting() {
    if (this.biographyFormGroup.invalid) {
      this.biographyFormGroup.markAllAsTouched();
    } else {
      this.userService.setBiography(this.biography.value)
        .subscribe((responseMessage) => {
          window.location.reload();
          this.closePopup();
          this.toastService.success(responseMessage);
        })
    }
  }

}

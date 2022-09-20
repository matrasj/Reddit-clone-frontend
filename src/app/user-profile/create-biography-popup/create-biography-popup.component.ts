import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user-service";
import {ToastrService} from "ngx-toastr";
import {BiographyModel} from "../../model/biography-model";
import {CanComponentDeactivate} from "./can-deactivate-auth-guard";
import {Observable} from "rxjs";
import {UrlTree} from "@angular/router";

@Component({
  selector: 'app-create-biography-popup',
  templateUrl: './create-biography-popup.component.html',
  styleUrls: ['./create-biography-popup.component.css']
})
export class CreateBiographyPopupComponent implements OnInit, CanComponentDeactivate{

  biographyFormGroup : FormGroup | any;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef : MatDialog,
              private formBuilder : FormBuilder,
              private userService : UserService,
              private toastService : ToastrService) {
    this.biographyFormGroup = this.formBuilder.group({
      biography : new FormControl('', [Validators.maxLength(100), Validators.required])
    })
    if (data && data?.biography) {
      this.biography.value = data.biography;
    }
  }

  ngOnInit(): void {

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

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return confirm("Do you want to discard?")
  }



}

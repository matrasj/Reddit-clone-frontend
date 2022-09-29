import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {SocialMediaLinkService} from "../../../service/social-media-link-service";
import {ToastrService} from "ngx-toastr";
import {SocialMediaLinkModel} from "../../../model/social-media-link-model";
import {
  CreateSocialMediaLinkPopupComponent
} from "../create-social-media-link-popup/create-social-media-link-popup.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-social-media-link-popup',
  templateUrl: './edit-social-media-link-popup-component.html',
  styleUrls: ['./edit-social-media-link-popup-component.css']
})
export class EditSocialMediaLinkPopupComponent implements OnInit {
  socialMediaLinkFormGroup : FormGroup | any;
  linkId : number | any;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef : DialogRef,
              private formBuilder : FormBuilder,
              private socialMediaLinkService : SocialMediaLinkService,
              private toastService : ToastrService) {
    this.linkId = data.linkId;
    this.socialMediaLinkFormGroup = this.formBuilder.group({
      socialMediaLink : this.formBuilder.group({
        socialMediaName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        url : new FormControl('', [Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"), Validators.required])
      })
    });

    this.socialMediaName.value = data.socialMediaName;
    this.socialMediaUrl.value = data.url;
  }

  ngOnInit(): void {

  }

  get socialMediaName() {
    return this.socialMediaLinkFormGroup.get('socialMediaLink').get("socialMediaName");
  }

  get socialMediaUrl() {
    return this.socialMediaLinkFormGroup.get('socialMediaLink').get("url");
  }

  closePopup() {
    this.dialogRef.close(EditSocialMediaLinkPopupComponent);
  }

  onSocialMediaLinkEditing() {
    if (this.socialMediaLinkFormGroup.invalid) {
      this.socialMediaLinkFormGroup.markAllAsTouched();
    } else {
      this.socialMediaLinkService.updateSocialMediaLink(new SocialMediaLinkModel(
        this.linkId,
        this.socialMediaUrl.value,
        this.socialMediaName.value
      )).subscribe((responseMessage) => {
        window.location.reload();
        this.closePopup();
        this.toastService.success(responseMessage);
      })
    }
  }

}

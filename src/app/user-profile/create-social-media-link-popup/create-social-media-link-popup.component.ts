import { Component, OnInit } from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SocialMediaLinkService} from "../../service/social-media-link-service";
import {SocialMediaLinkModel} from "../../model/social-media-link-model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-social-media-link-popup',
  templateUrl: './create-social-media-link-popup.component.html',
  styleUrls: ['./create-social-media-link-popup.component.css']
})
export class CreateSocialMediaLinkPopupComponent implements OnInit {
  socialMediaLinkFormGroup : FormGroup | any;
  constructor(private dialogRef : DialogRef,
              private formBuilder : FormBuilder,
              private socialMediaLinkService : SocialMediaLinkService,
              private toastService : ToastrService) { }

  ngOnInit(): void {
    this.socialMediaLinkFormGroup = this.formBuilder.group({
      socialMediaLink : this.formBuilder.group({
        socialMediaName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        url : new FormControl('', [Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"), Validators.required])
      })
    })
  }

  get socialMediaName() {
    return this.socialMediaLinkFormGroup.get('socialMediaLink').get("socialMediaName");
  }

  get socialMediaUrl() {
    return this.socialMediaLinkFormGroup.get('socialMediaLink').get("url");
  }

  closePopup() {
    this.dialogRef.close(CreateSocialMediaLinkPopupComponent);
  }

  onSocialMediaLinkCreating() {
    if (this.socialMediaLinkFormGroup.invalid) {
      this.socialMediaLinkFormGroup.markAllAsTouched();
    } else {
      this.socialMediaLinkService.createSocialLink(new SocialMediaLinkModel(
        null,
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

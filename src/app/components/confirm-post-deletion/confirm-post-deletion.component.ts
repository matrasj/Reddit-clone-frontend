import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PostService} from "../../service/post-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-post-deletion',
  templateUrl: './confirm-post-deletion.component.html',
  styleUrls: ['./confirm-post-deletion.component.css']
})
export class ConfirmPostDeletionComponent implements OnInit {
  id : number | any;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef : MatDialog,
              private postService : PostService,
              private toast : ToastrService) {
    this.id = data.id;
  }

  ngOnInit(): void {

  }

  closeModal() {
    this.dialogRef.closeAll();
  }

  deletePost() {
    this.postService.deletePostById(this.id)
      .subscribe((message) => {
        window.location.reload();
        this.dialogRef.closeAll();
        this.toast.info(message);
      });
  }



}

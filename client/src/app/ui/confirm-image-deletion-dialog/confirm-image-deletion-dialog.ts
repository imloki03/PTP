import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-image-deletion-dialog',
  imports: [MatButton, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './confirm-image-deletion-dialog.html',
})
export class ConfirmImageDeletionDialog {
  protected readonly data: { imageName?: string } = inject(MAT_DIALOG_DATA);
}

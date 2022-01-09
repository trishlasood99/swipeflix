import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public isOpen: boolean = false;
  constructor(public dialogBox: MatDialog) {
  }

  openDialogBox(data:any): any{

    // If a dialog box is already open, don't open another
    if(this.isOpen) {
      return false;
    }
    this.isOpen=true;

    // open() opens a dialog box containing the given template/component and returns a
    // reference to the newly opened dialog box
    const newDialogBoxRef = this.dialogBox.open(ErrorDialogComponent,{
      width:'300px',
      data:data
    });

    // afterClosed gets an observable that is notified when the dialog is finished closing
    // ?????????????
    newDialogBoxRef.afterClosed().subscribe((result:any) => {
      this.isOpen = false;
    });

  }
}

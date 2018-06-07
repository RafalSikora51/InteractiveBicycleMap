import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      height: '100px',
      hasBackdrop: true,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  closeDialog(): void {
    const dialogRef = this.dialog.closeAll();
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

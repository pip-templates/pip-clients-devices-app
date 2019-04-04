import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    InformationTitle: string;
    InformationMessage: string;
    CancelButtonLabel: string;
    OkButtonLabel: string;
}

@Component({
    styleUrls: ['device-delete-dialog.scss'],
    // tslint:disable-next-line:component-selector
    selector: 'device-delete-dialog',
    templateUrl: 'device-delete-dialog.html',

})

// tslint:disable-next-line:component-class-suffix
export class DeviceDeleteDialog {

    constructor(
        public dialogRef: MatDialogRef<DeviceDeleteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ControlObject } from '../../models';

export interface DialogData {
    objects: ControlObject[];
    selected?: ControlObject;
}

@Component({
    styleUrls: ['device-attach-dialog.scss'],
    // tslint:disable-next-line:component-selector
    selector: 'device-attach-dialog',
    templateUrl: 'device-attach-dialog.html',

})

// tslint:disable-next-line:component-class-suffix
export class DeviceAttachDialog {
    public index = 0;

    constructor(
        public dialogRef: MatDialogRef<DeviceAttachDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public select(object: ControlObject): void {
        this.data.selected = object;
    }

    public onSelect(id: string): void {
 
    }

}

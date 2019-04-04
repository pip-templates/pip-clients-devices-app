import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Device, Sensors  } from '../../models';
import { cloneDeep } from 'lodash';

export interface DialogData {
    device: Device;
    sensorList: string[];
    sensor?: Sensors;
}

@Component({
    styleUrls: ['change-sensor-interface-dialog.scss'],
    // tslint:disable-next-line:component-selector
    selector: 'change-sensor-interface-dialog',
    templateUrl: 'change-sensor-interface-dialog.html',

})

// tslint:disable-next-line:component-class-suffix
export class ChangeSensorInterface {
    public sensor: Sensors = new Sensors();
    public actionButtonText: string;
    public dialogTitle: string;

    constructor(
        public dialogRef: MatDialogRef<ChangeSensorInterface>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data.sensor) {
            this.sensor = cloneDeep(data.sensor);
            this.actionButtonText = 'DEVICE.CHANGE.SENSOR.DIALOG.BUTTON.CHANGE';
            this.dialogTitle = 'DEVICE.CHANGE.SENSOR.DIALOG.ADD.TITLE';
        }
        else {
            this.sensor.status = 'Active';
            this.sensor.id = Math.floor(Math.random() * 1000000000).toString()
            this.actionButtonText = 'DEVICE.CHANGE.SENSOR.DIALOG.BUTTON.ADD';
            this.dialogTitle = 'DEVICE.CHANGE.SENSOR.DIALOG.CHANGE.TITLE';
        }
 
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

 

}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Device, GeoDevices } from '../../models';
import { cloneDeep } from 'lodash';

export interface DialogData {
    device: Device;
    deviceTypeList: string[];
    geoDevice?: GeoDevices;
}

@Component({
    styleUrls: ['add-geolocation-device-dialog.scss'],
    // tslint:disable-next-line:component-selector
    selector: 'add-geolocation-device-dialog',
    templateUrl: 'add-geolocation-device-dialog.html',

})

// tslint:disable-next-line:component-class-suffix
export class AddGeolocationDeviceDialog {
 
    public geoDevice: GeoDevices = new GeoDevices();
    public actionButtonText: string;
    public dialogTitle: string;

    constructor(
        public dialogRef: MatDialogRef<AddGeolocationDeviceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        if (!data.geoDevice) {
            this.geoDevice.status = 'Active';
            this.geoDevice.id = Math.floor(Math.random() * 1000000000).toString();
            this.actionButtonText = 'DEVICE.CHANGE.GEODEVICE.DIALOG.ADD';
            this.dialogTitle = 'DEVICE.CHANGE.GEODEVICE.DIALOG.ADD.TITLE';
        }
        else {
            this.geoDevice = cloneDeep(data.geoDevice);
            this.actionButtonText = 'DEVICE.CHANGE.GEODEVICE.DIALOG.CHANGE';
            this.dialogTitle = 'DEVICE.CHANGE.GEODEVICE.DIALOG.CHANGE.TITLE';
        }
    }
 
    onNoClick(): void {
        this.dialogRef.close();
    }
 

}

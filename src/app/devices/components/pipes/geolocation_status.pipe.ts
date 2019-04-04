import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { GeoDevices, DeviceStatus } from '../../models';

@Pipe({ name: 'geolocationStatus' })
export class GeolocationStatusPipe implements PipeTransform {
    constructor(private translate: TranslateService) {   }


    transform(geoDevice: GeoDevices): string {
        let label: string;
        switch (geoDevice.status) {
            case DeviceStatus.Active:
                label = this.translate.instant('DEVICE.STATUS.ACTIVE');
                break;
            case DeviceStatus.Pending:
                label = this.translate.instant('DEVICE.STATUS.PENDING');
                break;
            case DeviceStatus.Inactive:
                label = this.translate.instant('DEVICE.STATUS.INACTIVE');
                break;
            case DeviceStatus.Blocked:
                label = this.translate.instant('DEVICE.STATUS.BLOCKED');
                break;
        }

        let mountedLabel: string = this.translate.instant('DEVICE.STATUS.LABEL.MOUNTED'); 
        let measureMeter: string = this.translate.instant('DEVICE.STATUS.LABEL.METER');
        let measureDeg: string = this.translate.instant('DEVICE.STATUS.LABEL.DEG');
        let directionLabel: string = this.translate.instant('DEVICE.STATUS.LABEL.DIRECTION');
        let distanceLabel: string = this.translate.instant('DEVICE.STATUS.LABEL.DISTANCE');

        if (geoDevice.offset_x != null && geoDevice.offset_y != null) {
            label = `${label}, ${mountedLabel} ${geoDevice.offset_x}${measureMeter}, ${geoDevice.offset_y}${measureMeter}`;
        } else if (geoDevice.offset_x != null) {
            label = `${label},  ${mountedLabel} ${geoDevice.offset_x}${measureMeter}, 0${measureMeter}`;
        } else if (geoDevice.offset_y != null) {
            label = `${label}, ${mountedLabel} 0${measureMeter}, ${geoDevice.offset_y}${measureMeter}`;
        }
        if (geoDevice.dir_start != null && geoDevice.dir_end != null) {
            label = `${label}, ${directionLabel} ${geoDevice.dir_start}, ${geoDevice.dir_end}`;
        } else if (geoDevice.dir_start != null) {
            label = `${label}, ${directionLabel} ${geoDevice.dir_start}`;
        } else if (geoDevice.dir_end != null) {
            label = `${label}, ${directionLabel} ${geoDevice.dir_end}`;
        }
        if (geoDevice.distance != null) {
            label = `${label}, ${distanceLabel} ${geoDevice.distance}${measureMeter}`;
        }

        return label;
    }
}
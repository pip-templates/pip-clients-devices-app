import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DeviceStatus } from '../../models';

@Pipe({ name: 'statusTranslate' })
export class StatusTranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) { }

    transform(value: string): string {
        switch (value) {
            case DeviceStatus.Active:
                return this.translate.instant('DEVICE.STATUS.ACTIVE');
            case DeviceStatus.Pending:
                return this.translate.instant('DEVICE.STATUS.PENDING');
            case DeviceStatus.Inactive:
                return this.translate.instant('DEVICE.STATUS.INACTIVE');
            case DeviceStatus.Blocked:
                return this.translate.instant('DEVICE.STATUS.BLOCKED');
        }

        return '';
    }
}
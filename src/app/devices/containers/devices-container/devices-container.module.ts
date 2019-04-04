import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { 
    MatIconModule, 
    MatListModule, 
    MatProgressBarModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatSelectModule, 
    MatCheckboxModule 
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { PipScrollableModule, PipSidenavModule, PipDocumentLayoutModule, PipMenuLayoutModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipSelectedModule } from 'pip-webui2-behaviors';
import { PipRefItemModule } from 'pip-webui2-controls';

import { DevicesContainerComponent } from './devices-container.component';
import { DevicesListModule } from '../../components/devices-list/devices-list.module'
import { DeviceDetailsModule } from '../../components/device-details/device-details.module'

import { DeviceDeleteDialog } from '../../components/device-delete-dialog/device-delete-dialog';
import { DeviceAttachDialog } from '../../components/device-attach-dialog/device-attach-dialog';
import { AddGeolocationDeviceDialog } from '../../components/add-geolocation-device-dialog/add-geolocation-device-dialog';
import { ChangeSensorInterface } from '../../components/change-sensor-interface-dialog/change-sensor-interface-dialog';

@NgModule({
    declarations: [DevicesContainerComponent, DeviceDeleteDialog, DeviceAttachDialog, AddGeolocationDeviceDialog, ChangeSensorInterface],
    entryComponents: [
        DeviceDeleteDialog,
        DeviceAttachDialog,
        AddGeolocationDeviceDialog,
        ChangeSensorInterface
    ],
    exports: [DevicesContainerComponent],
    imports: [
        // Angular and vendors
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatDialogModule,
        MatListModule,
        MatSelectModule,
        MatCheckboxModule,
        // pip-suite2 & pip-webui2
        PipDocumentLayoutModule,
        PipMenuLayoutModule,
        PipEmptyStateModule,
        PipSidenavModule,
        PipScrollableModule,
        PipSelectedModule,
        PipRefItemModule,
        TranslateModule,
        // application modules
        DevicesListModule,
        DeviceDetailsModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevicesContainerModule { }

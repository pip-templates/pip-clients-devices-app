import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule
} from '@angular/material';

import { MatProgressBarModule, MatButtonToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { PipActionListModule, PipButtonToggleGroupModule } from 'pip-webui2-buttons';
import { PipDocumentLayoutModule, PipScrollableModule, PipMediaModule, PipShadowModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipRefItemModule } from 'pip-webui2-controls';

import { DeviceDetailsComponent } from './device-details.component';
import { GeolocationStatusPipe } from '../pipes/geolocation_status.pipe';
import { StatusTranslatePipe } from '../pipes/status.pipe';

@NgModule({
    declarations: [
        DeviceDetailsComponent,
        GeolocationStatusPipe,
        StatusTranslatePipe
    ],
    imports: [
        PipDocumentLayoutModule,
        PipMediaModule,
        PipShadowModule,
        PipButtonToggleGroupModule,

        FlexLayoutModule,

        TranslateModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,

        MatTabsModule,
        MatIconModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,
        MatListModule,

        PipRefItemModule,
        PipActionListModule,
        PipScrollableModule,
        PipEmptyStateModule 
    ],
    exports: [
        DeviceDetailsComponent,
        GeolocationStatusPipe,
        StatusTranslatePipe        
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceDetailsModule { }

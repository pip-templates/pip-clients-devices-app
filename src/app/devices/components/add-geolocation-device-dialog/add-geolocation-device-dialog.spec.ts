import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesModule } from '../../devices.module';
import { AddGeolocationDeviceDialog } from './add-geolocation-device-dialog';
import { AppModule } from '../../../app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { DeviceDetailsModule } from '../device-details/device-details.module';
 

describe('AddGeolocationDeviceDialog', () => {
    let component: AddGeolocationDeviceDialog;
    let fixture: ComponentFixture<AddGeolocationDeviceDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                DevicesModule,
                DeviceDetailsModule
            ],
            providers: [{ provide: MatDialogRef, useValue: { close: (dialogResult: any) => {  }}},
              { provide: MAT_DIALOG_DATA, useValue: [] },]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddGeolocationDeviceDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

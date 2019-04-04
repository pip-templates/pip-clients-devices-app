import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesModule } from '../../devices.module';
import { ChangeSensorInterface } from './change-sensor-interface-dialog';
import { AppModule } from '../../../app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { DeviceDetailsModule } from '../device-details/device-details.module';

describe('ChangeSensorInterface', () => {
    let component: ChangeSensorInterface;
    let fixture: ComponentFixture<ChangeSensorInterface>;

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
        fixture = TestBed.createComponent(ChangeSensorInterface);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

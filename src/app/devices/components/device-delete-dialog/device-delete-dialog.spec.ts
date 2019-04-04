import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 
import { DevicesModule } from '../../devices.module';
import { DeviceDeleteDialog } from './device-delete-dialog';
import { AppModule } from '../../../app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { DeviceDetailsModule } from '../device-details/device-details.module';

describe('DeviceDeleteDialog', () => {
    let component: DeviceDeleteDialog;
    let fixture: ComponentFixture<DeviceDeleteDialog>;

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
        fixture = TestBed.createComponent(DeviceDeleteDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

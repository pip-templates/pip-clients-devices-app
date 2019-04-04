import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 
import { DevicesModule } from '../../devices.module';
import { DeviceAttachDialog } from './device-attach-dialog';
import { AppModule } from '../../../app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { DeviceDetailsModule } from '../device-details/device-details.module';


describe('DeviceAttachDialog', () => {
    let component: DeviceAttachDialog;
    let fixture: ComponentFixture<DeviceAttachDialog>;

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
        fixture = TestBed.createComponent(DeviceAttachDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

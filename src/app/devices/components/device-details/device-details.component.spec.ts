import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { DeviceDetailsModule } from './device-details.module';
import { DevicesModule } from '../../devices.module';
import { DeviceDetailsComponent } from './device-details.component';
import { AppModule } from '../../../app.module';

describe('a device-details component', () => {
    let component: DeviceDetailsComponent;
    let fixture: ComponentFixture<DeviceDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                DevicesModule,
                DeviceDetailsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesContainerComponent } from './devices-container.component';
import { AppModule } from '../../../app.module';
import { DevicesModule } from '../../devices.module';

describe('DevicesContainerComponent', () => {
    let component: DevicesContainerComponent;
    let fixture: ComponentFixture<DevicesContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                DevicesModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DevicesContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

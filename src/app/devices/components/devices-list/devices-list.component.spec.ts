import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesListComponent } from './devices-list.component';
import { DevicesListModule } from './devices-list.module';
import { DevicesModule } from '../../devices.module';
import { AppModule } from '../../../app.module';

describe('DevicesListComponent', () => {
    let component: DevicesListComponent;
    let fixture: ComponentFixture<DevicesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                DevicesModule,
                DevicesListModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DevicesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

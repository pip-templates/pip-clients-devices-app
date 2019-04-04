import { NgModule } from '@angular/core';


import { DevicesContainersModule } from './containers/containers.module';
import { DevicesComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DeviceEffects, deviceReducer } from './store'

import { DevicesService, DeviceDataService, ControlObjectDataService } from './services';

@NgModule({
    imports: [
        DevicesContainersModule,
        DevicesComponentsModule,
        EffectsModule.forFeature([DeviceEffects]),
        StoreModule.forFeature('device', deviceReducer),
    ],
    providers: [
        DevicesService,
        DeviceDataService,
        ControlObjectDataService
    ],
})
export class DevicesModule { }

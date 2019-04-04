import { NgModule } from '@angular/core';

import { DevicesListModule } from './devices-list/devices-list.module';
import { DeviceDetailsModule } from './device-details/device-details.module';


@NgModule({
  imports: [
    DevicesListModule,
    DeviceDetailsModule
  ] 
})
export class DevicesComponentsModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule, ShellContainerComponent } from 'pip-clients-shell';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { DevicesModule } from './devices/devices.module';


import { mockDevicesProvider, mockObjectsProvider } from './mock';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        // pip-clients
        ShellModule.forMock(),
        // application modules
        AppRoutingModule,
        DevicesModule
    ],
    providers: [
        // Mock providers
        mockDevicesProvider,
        mockObjectsProvider
    ],
    bootstrap: [ShellContainerComponent]
})
export class AppModule { }

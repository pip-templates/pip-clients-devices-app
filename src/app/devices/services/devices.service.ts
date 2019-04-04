import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SitesService, Site } from 'pip-clients-shell';

import { 
    InitAction,
    DeviceSelectAction,
    DeviceChangeStateAction,
    DeviceCreateAction,
    DeviceChangeCancelAction,
    DeviceUpdateAction,
    DeviceDeleteAction 
} from '../store/devices.action';
import {
    getDeviceDevices,
    getDeviceObjects,
    getDeviceLoading,
    getDeviceViewState,
    getDeviceError,
    getDeviceSelectedId
} from '../store/devices.state'

import { Device, ControlObject } from '../models';
import { DeviceDataService } from '../services/devices.data.service';
import { ControlObjectDataService } from '../services/objects.data.service';

import * as _ from 'lodash';

@Injectable()
export class DevicesService {
    static deviceUpdateSub = null;

    constructor(
        private deviceDataService: DeviceDataService,
        private objectDataServiceDataService: ControlObjectDataService,
        private sitesService: SitesService,
        private store: Store<any>
    ) { }

    public init(): void {
        if (DevicesService.deviceUpdateSub) { return; }
 
        DevicesService.deviceUpdateSub = this.sitesService.current$.pipe(
            filter(site => site !== null)
        ).subscribe((site: Site) => {
            this.deviceDataService.siteId = site.id;
            this.objectDataServiceDataService.siteId = site.id;

            this.store.dispatch(new InitAction());
        });
    }
 
    public get error$(): Observable<string> {
        return this.store.select<any>(getDeviceError);
    }
 
    public get loading$(): Observable<boolean> {
        return this.store.select<any>(getDeviceLoading);
    }

    public get viewState$(): Observable<string> {
        return this.store.select<any>(getDeviceViewState);
    }

    public get devices$(): Observable<Device[]> {
        return this.store.select<any>(getDeviceDevices);
    }

    public get objects$(): Observable<ControlObject[]> {
        return this.store.select<any>(getDeviceObjects);
    }

    public get selectId$(): Observable<string> {
        return this.store.select<any>(getDeviceSelectedId);
    }

    public get selectDevice$() {
        return this.store.select<any>((state) => {
            const id: string = state.device.selectId;
            const devices = state.device.devices;
            if (devices && id) {
                for (const device of devices) {
                    if (device.id === id) {
                        return device;
                    }
                }
            }
            return null;
        });
    }
 
    public deviceSelect(id: string): void {
        this.store.dispatch(new DeviceSelectAction(id));
    }

    public deviceChangeState(state: string): void {
        this.store.dispatch(new DeviceChangeStateAction(state));
    }

    public deviceCreate(device: Device) {
        this.store.dispatch(new DeviceCreateAction(device));
    }

    public deviceUpdate(device: Device) {
        this.store.dispatch(new DeviceUpdateAction(device));
    }

    public deviceDelete(id: string) {
        this.store.dispatch(new DeviceDeleteAction(id));
    }

    public deviceChangeCancel(devices: Device[]) {
        this.store.dispatch(new DeviceChangeCancelAction(devices));
    }

    public getNewDevice(): Device {
        return new Device();
    }

}

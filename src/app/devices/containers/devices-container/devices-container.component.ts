import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { PipMediaService, PipSidenavService, MediaMainChange } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

import { DevicesTranslations } from '../../devices.strings';
import { Device, ViewState, ControlObject, GeoDevices, Sensors } from '../../models';
import { DevicesService } from '../../services';
import { ControlObjectDataService } from '../../services';
import { DeviceDeleteDialog } from '../../components/device-delete-dialog/device-delete-dialog';
import { DeviceAttachDialog } from '../../components/device-attach-dialog/device-attach-dialog';
import { AddGeolocationDeviceDialog } from '../../components/add-geolocation-device-dialog/add-geolocation-device-dialog';
import { ChangeSensorInterface } from '../../components/change-sensor-interface-dialog/change-sensor-interface-dialog';
import { DeviceDetailsComponent } from '../../components/device-details';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pip-devices-container',
    templateUrl: './devices-container.component.html',
    styleUrls: ['./devices-container.component.scss']
})
export class DevicesContainerComponent implements OnInit, OnDestroy {

    private subs: Subscription = new Subscription();
    private isBackIcon = false;
    public language: string;

    public devices$: Observable<Device[]>;
    public objects$: Observable<ControlObject[]>;
    public loading$: Observable<boolean>;
    public error$: Observable<any>;
    public viewState$: Observable<string>;
    public selectId$: Observable<string>;
    public selectDevice$: Observable<Device>;
    public isSingle: boolean;
    public languages: string[] = ['en', 'ru'];
    public ln = 'en';
    private _devices: Device[];
    private _objects: ControlObject[];
    private _state: string;
    public isSingle$: BehaviorSubject<boolean>;
    public isChanged = false;
    public emptyDevice: Device;
    private _subscribeMedia: Subscription;
    public emptyStateActions: any[];
    private afterDelete: boolean = false;
    private _selectedId: string;

    @ViewChild('deviceDetails') private deviceDetails: DeviceDetailsComponent;

    constructor(
        public dialog: MatDialog,
        private translate: TranslateService,
        private navService: PipNavService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        public sidenav: PipSidenavService,
        private deviceService: DevicesService,
        private objectDataService: ControlObjectDataService,
        public media: PipMediaService
    ) {
        this.language = this.translate.currentLang;
        this.subs.add(this.translate.onLangChange.subscribe(payload => this.language = payload.lang));

        this.translate.setTranslation('en', DevicesTranslations.en, true);
        this.translate.setTranslation('ru', DevicesTranslations.ru, true);

        this.sidenav.active = true;
        this.error$ = this.deviceService.error$;
        this.loading$ = this.deviceService.loading$;
        this.devices$ = this.deviceService.devices$;
        this.objects$ = this.deviceService.objects$;
        this.viewState$ = this.deviceService.viewState$;
        this.selectId$ = this.deviceService.selectId$;
        this.selectDevice$ = this.deviceService.selectDevice$;

        this.emptyDevice = this.deviceService.getNewDevice();

        this.navService.showBreadcrumb({
            items: [
                { title: 'APP_BREADCRUMB_TEXT' }
            ]
        });

        this.emptyStateActions = [
            { title: this.translate.instant('DEVICE.ADD.BUTTON.TEXT'), action: () => { this.initAdd(); } }
        ];
    }


    public ngOnInit() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        const state = this.activatedRoute.snapshot.queryParams['state'];

        this.isSingle = !isMobile ? !!this.activatedRoute.snapshot.queryParams['single'] : false;
        this.isSingle$ = new BehaviorSubject(this.isSingle);
        this.isSingle$.subscribe(single => {
            this.isSingle = single;
            this.router.navigate(['/'], { queryParams: { single: this.isSingle }, queryParamsHandling: 'merge' });
            this.changeNavWithState();
        });
        this.isSingle$.next((isMobile) && (state === ViewState.Create || state === ViewState.Edit) ? true : this.isSingle);

        this.selectId$.subscribe((id) => {
            if (this._selectedId != id && this.afterDelete) {
                if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
                    this.isSingle$.next(false);
                }   
            }
            this._selectedId = id;
        });

        this.devices$.subscribe(devices => this._devices = devices);
        this.objects$.subscribe(objects => this._objects = objects);
        this.viewState$.subscribe(st => {
            this._state = st;
            if (!this.isSingle && this._state === ViewState.Empty) {
                this.isSingle$.next(false);
            }  else  this.changeNavWithState();
        });
        this.deviceService.init();
        this._subscribeMedia = this.media.asObservableMain().subscribe((change: MediaMainChange) => {
            if (!(change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(false);
                if (this.isBackIcon) { this.restoreIcon(); }
            }

            if ((change.aliases.includes('xs') || change.aliases.includes('sm'))
                && (this._state === ViewState.Create || this._state === ViewState.Edit)) {
                this.isSingle$.next(true);
            }

            if (this._state === ViewState.Empty) {
                this.isSingle$.next(false);
            }

            this.router.navigate([], { queryParams: { single: this.isSingle }, queryParamsHandling: 'merge' });
            this.cd.detectChanges();
        });
    }

    public ngOnDestroy() {
        this._subscribeMedia.unsubscribe();
    }

    public changeLn(ln: string) {
        this.ln = ln;
    }

    public get state(): string {
        return this._state;
    }

    public openDeleteDialog(id: string): void {
        this.dialog.open(DeviceDeleteDialog, {
            width: '450px',
            data: {
                InformationTitle: 'DEVICE.DELETE.DIALOG.TITLE',
                InformationMessage: 'DEVICE.DELETE.DIALOG.MESSAGE',
                CancelButtonLabel: 'DEVICE.DELETE.DIALOG.BUTTON.CANCEL',
                OkButtonLabel: 'DEVICE.DELETE.DIALOG.BUTTON.OK'              
            }
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.delete(id);
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    public openAttachDeviceDialog(device: Device): void {
        this.dialog.open(DeviceAttachDialog, {
            width: '550px',
            data: { objects: _.filter(this._objects, (object: ControlObject) => !object.device_id) }
        }).afterClosed().subscribe((result: ControlObject) => {
            if (result) {
                if (device.object_id) { this.detachObject(device); }

                device.object_id = result.id;
                this.deviceService.deviceUpdate(device);
                // update object
                result.device_id = device.id;
                this.attachObject(result.id, device.id);
            } else {

            }
        });
    }

    public addSensor(event): void {
        const device: Device = event.device;
        const sensor: GeoDevices = event.sensor;

        this.dialog.open(ChangeSensorInterface, {
            width: '450px',
            data: { device: device, sensorList: this.getSensors(device), sensor: sensor }
        }).afterClosed().subscribe((result: Sensors) => {
            if (result) {
                if (!device.sensors) {
                    device.sensors = [];
                }
                // update
                if (sensor) {
                    const index = _.findIndex(device.sensors, { id: sensor.id });
                    if (index !== -1) {
                        device.sensors[index] = result;
                    }
                } else {
                    device.sensors.push(result);
                }

                this.deviceService.deviceUpdate(device);
            } else {

            }
        });
    }

    public getDeviceTypes(device: Device): string[] {
        return ['GPS', 'RF Tag Reader', 'Short Range Radar', 'Ultra-wide Band (UWB)', 'Unknown'];
    }

    public getSensors(device: Device): string[] {
        return ['Caterpillar-797F', 'Generic TPMS', 'Unknown'];
    }

    public addGeolocation(event): void {
        const device: Device = event.device;
        const geoDevice: GeoDevices = event.geoDevice;

        this.dialog.open(AddGeolocationDeviceDialog, {
            width: '550px',
            minWidth: '450px',
            data: { device: device, deviceTypeList: this.getDeviceTypes(device), geoDevice: geoDevice }
        }).afterClosed().subscribe((result: GeoDevices) => {
            if (result) {
                if (!device.geolocation_devices) {
                    device.geolocation_devices = [];
                }
                // update
                if (geoDevice) {
                    const index = _.findIndex(device.geolocation_devices, { id: geoDevice.id });
                    if (index !== -1) {
                        device.geolocation_devices[index] = result;
                    }
                } else {
                    device.geolocation_devices.push(result);
                }

                this.deviceService.deviceUpdate(device);
            } else {

            }
        });
    }

    private onSelectById(id: string): void {
        this.deviceService.deviceSelect(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => {
                    if (this._state === ViewState.Create || this._state === ViewState.Edit) {
                        this.openCancelDialog(null);
                    } else {
                        this.isSingle$.next(false);
                        this.restoreIcon(); 
                    }
                }
            });
        }
    }
 
    private restoreIcon() {
        this.isBackIcon = false;
        this.navService.showNavIcon({
            icon: 'menu',
            action: () => {
                this.sidenav.toggleOpened();
            }
        });
    }

    private openCancelDialog(id: string): void {
        this.dialog.open(DeviceDeleteDialog, {
            width: '450px',
            data: {
                InformationTitle: 'DEVICE.CANCEL.EDIT.DIALOG.TITLE',
                InformationMessage: 'DEVICE.CANCEL.EDIT.DIALOG.MESSAGE',
                CancelButtonLabel: 'DEVICE.CANCEL.EDIT.DIALOG.BUTTON.CANCEL',
                OkButtonLabel: 'DEVICE.CANCEL.EDIT.DIALOG.BUTTON.OK'              
            }
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.cancel();

                if (id) {
                    setTimeout(() => {
                        this.onSelectById(id);
                    }, 20);
                }
            } 
        });
    }
    public select(id: string): void {
        if (this._state !== ViewState.Create && this._state !== ViewState.Edit) {
            this.onSelectById(id);
        }  else {
            this.openCancelDialog(id);
        }
    }

    public initAdd() {
        this.deviceService.deviceChangeState(ViewState.Create);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => this.openCancelDialog(null)
            });
        }
    }

    public cancel() {
        this.deviceService.deviceChangeCancel(this._devices);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
        if (this.isBackIcon) {
            this.restoreIcon();
        }
        this.deviceDetails.resetComponent();
    }

    public update(device: Device) {
        this.deviceService.deviceUpdate(device);
    }

    public detachObject(device: Device) {
        const index = _.findIndex(this._objects, { device_id: device.id });

        if (index !== -1) {
            this._objects[index].device_id = null;
            this.objectDataService.controlObjectUpdate(this._objects[index]);
        }
    }

    public attachObject(objectId: string, deviceId: string) {
        const index = _.findIndex(this._objects, { id: objectId });

        if (index !== -1) {
            this._objects[index].device_id = deviceId;
            this.objectDataService.controlObjectUpdate(this._objects[index]);
        }
    }

    public create(device: Device) {
        this.deviceService.deviceCreate(device);
    }

    public change() {
        this.deviceService.deviceChangeState(ViewState.Edit);
    }

    public delete(id: string) {
        this.deviceService.deviceDelete(id);
        this.afterDelete = true;
    }

    public changeNavWithState() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        if (!this.isSingle && this.isBackIcon) {
            this.restoreIcon();
        }
        let title: string;
        if (!isMobile) {
            
            switch (this._state) {
                case ViewState.View:
                    title = 'APP_BREADCRUMB_TEXT';
                    break;
                case ViewState.Edit:
                    title = !this.isSingle ? 'APP_BREADCRUMB_TEXT': 'DEVICE.UPDATE'
                    break;
                case ViewState.Create:
                    title = 'DEVICE.CREATE';
                    break;
                default:
                    title = 'APP_BREADCRUMB_TEXT';
            }
            this.navService.showBreadcrumb({
                items: [
                    { title: title }
                ]
            });
        } else {
            if (this.isSingle && !this.isBackIcon) {
                this.isBackIcon = true;    
                this.navService.showNavIcon({
                    icon: 'arrow_back',
                    action: () => {
                        if (this._state == ViewState.Edit || this._state === ViewState.Create) {
                            this.openCancelDialog(null);
                        } else {
                            this.cancel();
                        }
                    }
                });    
            }
            switch (this._state) {
                case ViewState.View:
                    title = 'APP_BREADCRUMB_TEXT';
                    break;
                case ViewState.Edit:
                    title = !this.isSingle ? 'APP_BREADCRUMB_TEXT': 'DEVICE.UPDATE'
                    break;
                case ViewState.Create:
                    title = 'DEVICE.CREATE';
                    break;
                default:
                    title = 'APP_BREADCRUMB_TEXT';
            }
            this.navService.showBreadcrumb({
                items: [ { title: title } ]
            });
        }

    }

}

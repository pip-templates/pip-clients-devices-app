import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, remove } from 'lodash';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { deviceDetailsTranslations } from './device-details.strings';
import { Device, DeviceStatus, DeviceModels, GeoDevices, Sensors } from '../../models';
import { DevicesService } from '../../services';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'device-details',
    templateUrl: 'device-details.component.html',
    styleUrls: ['./device-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceDetailsComponent implements OnInit, OnChanges, OnDestroy {

    private changesSub: Subscription;
    private defaultFormValue: {
        udi: string,
        model: string,
        label: string,
        statue: string
    };
    private subs: Subscription;

    public updateItem: Device = new Device();
    public form: FormGroup;
    public keys = Object.keys;
    public tabIndex: number = 0;

    public statuses: string[] = Object.values(DeviceStatus);
    public deviceModels: string[] = Object.values(DeviceModels);

    @Input() loading = false;
    @Input() single = false;
    @Input() error: any = null;
    @Input() set device(val: Device) {
        if (this.changesSub) { this.changesSub.unsubscribe(); }
        if (val) {
            this.updateItem = cloneDeep(val);
        } else {
            this.updateItem = new Device();
        }
        this.form.setValue({
            udi: this.updateItem.udi || '',
            model: this.updateItem.model || '',
            label: this.updateItem.label || '',
            status: this.updateItem.status || ''
        });
        this.defaultFormValue = this.form.getRawValue();
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.changesSub = this.form.valueChanges.pipe(filter(() => this.form.dirty), take(1)).subscribe(() => {
            this.change.emit();
        });
    }

    @Output() cancel = new EventEmitter();
    @Output() update = new EventEmitter();
    @Output() attach = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() change = new EventEmitter();
    @Output() detachObject = new EventEmitter();
    @Output() addGeolocation = new EventEmitter();
    @Output() addSensor = new EventEmitter();

    public GeoDeviceColor = '#1b5e20';
    public AttachedToColor = '#bf360c';
    public SensorColor = '#880e4f';

    public emptyStateGeoActions: any[];
    public emptyStateOEMActions: any[];

    // You can set different colors for different types of devices.
    public colors: string[] = ['#1b5e20', '#bf360c', '#880e4f', '#004d40', '#311B92', '#0D47A1', '#4A148C', '#3E2723'];

    public constructor(
        private fb: FormBuilder,
        private devicesService: DevicesService,
        private translate: TranslateService
    ) {
        this.translate.setTranslation('en', deviceDetailsTranslations.en, true);
        this.translate.setTranslation('ru', deviceDetailsTranslations.ru, true);
        this.subs = new Subscription();
        this.form = this.fb.group({
            udi: ['', Validators.required],
            model: ['', Validators.required],
            label: [''],
            status: ['', Validators.required]
        });
        this.defaultFormValue = this.form.getRawValue();
        this.subs.add(this.devicesService.loading$.subscribe((state) => {
            if (state) {
                this.form.disable();
            } else {
                this.form.enable();
                this.tabIndex === 0 ? this.form.get('udi').enable() : this.form.get('udi').disable();
            }
        }));

        this.emptyStateGeoActions = [
            { title: this.translate.instant('DEVICE_DETAILS_GEO_ADD'), action: () => { this.onAddGeolocation(); } }
        ];
        this.emptyStateOEMActions = [
            { title: this.translate.instant('DEVICE_DETAILS_OEM_ADD'), action: () => { this.onAddSensor(); } }
        ];
    }

    public ngOnChanges(change: SimpleChanges) {
        if (this.loading) { return; }
        if (change.device) {
            this.updateItem = cloneDeep(change.device.currentValue);
            if (!this.updateItem) {
                this.updateItem = new Device();
            }
        }

    }

    public ngOnInit() { }

    public ngOnDestroy() { this.subs.unsubscribe(); }

    public hasError(field: string, error: string) {
        return this.form.get(field).getError(error) && this.form.get(field).touched;
    }

    public onTabChange(index: number) {
        this.tabIndex = index;
        this.tabIndex === 0 ? this.form.get('udi').enable() : this.form.get('udi').disable();
    }

    public onCancel(): void {
        this.form.reset(this.defaultFormValue);
        this.cancel.emit();
    }

    public resetComponent(): void {
        this.device = this.updateItem;
    }

    public deleteSubmit(): void {
        this.delete.emit(this.updateItem.id);
    }

    public saveSubmit(): void {
        const device = Object.assign(cloneDeep(this.updateItem), this.form.getRawValue());
        this.form.disable();
        this.update.emit(device);
    }

    public onDeleteGeoDevice(geoDevice: GeoDevices, $event: MouseEvent): void {
        if ($event) { $event.stopPropagation(); }
        const device = cloneDeep(this.updateItem);
        remove(device.geolocation_devices, { 'id': geoDevice.id });
        this.update.emit(device);
    }

    public onDeleteSensor(sensor: Sensors, $event: MouseEvent): void {
        if ($event) { $event.stopPropagation(); }
        const device = cloneDeep(this.updateItem);
        remove(device.sensors, { id: sensor.id });
        this.update.emit(device);
    }

    public onChangeObject(): void {
        this.attach.emit(this.updateItem);
    }

    public onAttachObject(): void {
        this.attach.emit(this.updateItem);
    }

    public onDetachObject(): void {
        const device = cloneDeep(this.updateItem);
        device.object_id = null;
        this.update.emit(device);
        this.detachObject.emit(cloneDeep(this.updateItem));
    }

    public onAddGeolocation(): void {
        this.addGeolocation.emit({ device: cloneDeep(this.updateItem), geoDevice: null });
    }

    public onAddSensor(): void {
        this.addSensor.emit({ device: cloneDeep(this.updateItem), sensor: null });
    }

    public onChangeSensor(sensor: Sensors): void {
        this.addSensor.emit({ device: cloneDeep(this.updateItem), sensor: sensor });
    }

    public onChangeGeoDevice(geoDevice: GeoDevices): void {
        this.addGeolocation.emit({ device: cloneDeep(this.updateItem), geoDevice: geoDevice });
    }

    public getErrorMessage(error: any): string {
        return typeof error !== 'object' ? error : error.code ? this.translate.instant(error.code) : error.message;
    }
}

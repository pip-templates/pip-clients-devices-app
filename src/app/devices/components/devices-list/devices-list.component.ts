import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { findIndex } from 'lodash';
import { PipMediaService } from 'pip-webui2-layouts';

import { Device, ViewState } from '../../models';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'devices-list',
    templateUrl: 'devices-list.component.html',
    styleUrls: ['./devices-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesListComponent implements OnInit, OnDestroy, OnChanges {
    public index: number;
    public withouAttachedObjectLabel: string;

    @Input() loading = false;
    @Input() state: string = null;
    @Input() devices: Device[];
    @Input() selectId: string;
    @Input() emptyStateActions: any;

    @Input() progressText = 'Loading devices';
    @Input() newDeviceText = 'New device';
    @Input() newDeviceSubText = 'New device model';
    @Input() progressImageUrl = './assets/progress.svg';
    @Input() emptyImageUrl = './assets/empty.svg';
    @Input() emptyText = 'Devices not found';
    @Input() emptySubText = '';
    @Input() emptyListUrl = './assets/menu-empty.svg';

    @Output() selectChange = new EventEmitter();
    @Output() add = new EventEmitter();

    public DeviceColor = '#004d40';

    public constructor(
        public media: PipMediaService,
        private translate: TranslateService
    ) {
        this.withouAttachedObjectLabel = this.translate.instant('DEVICE_LIST_WITHOUT_OBJECT_LABEL')
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {

    }

    public ngOnChanges(change: SimpleChanges) {
        if (this.loading)  return;

        if (change.selectId && change.selectId.currentValue !== change.selectId.previousValue) {
            this.index = findIndex(this.devices, { id: this.selectId });
        }
    }

    public onSelect(event) {
        if (event) this.selectChange.emit(this.devices[event.index].id)
    }

    public select(id: string): void {
        if (this.state === ViewState.Edit) this.selectChange.emit(id);
    }

    public addDevice() {
        this.add.emit();
    }

}

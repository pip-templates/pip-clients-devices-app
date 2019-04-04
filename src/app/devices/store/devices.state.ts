import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Device, ControlObject } from '../models';
 

export interface DeviceState {
    devices: Device[];
    objects: ControlObject[];
    loading: boolean;
    viewState: string;
    error: any;
    selectId: string;
    urlState: any;
    isSingle: boolean;
}


export const getDevicessStoreState = createFeatureSelector<DeviceState>('device');

export const getDeviceDevices = createSelector(getDevicessStoreState, (state: DeviceState) => state.devices);
export const getDeviceObjects = createSelector(getDevicessStoreState, (state: DeviceState) => state.objects);
export const getDeviceLoading = createSelector(getDevicessStoreState, (state: DeviceState) => state.loading);
export const getDeviceViewState = createSelector(getDevicessStoreState, (state: DeviceState) => state.viewState);
export const getDeviceError = createSelector(getDevicessStoreState, (state: DeviceState) => state.error);
export const getDeviceSelectedId = createSelector(getDevicessStoreState, (state: DeviceState) => state.selectId);
export const getDeviceUrlState = createSelector(getDevicessStoreState, (state: DeviceState) => state.urlState);
export const getDeviceIsSingle = createSelector(getDevicessStoreState, (state: DeviceState) => state.isSingle);


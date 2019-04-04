import { fromJS } from 'immutable';

import { DeviceActionType, DeviceAction } from './devices.action';
import { DeviceState } from './devices.state';
import { ViewState, Device } from '../models';
import * as _ from 'lodash';

export const InitialDeviceState: DeviceState = {
    devices: [],
    objects: [],
    selectId: null,
    viewState: ViewState.Progress,
    loading: null,
    error: null,
    isSingle: false,
    urlState: {}
};


export function deviceReducer(
    state: DeviceState = InitialDeviceState, 
    action: DeviceAction
): DeviceState {
    switch (action.type) {
        case DeviceActionType.Init:
            let map = fromJS(state);
            map = map.set('devices', []);
            map = map.set('objects', []);
            map = map.set('error', null);
            map = map.set('loading', true);
            map = map.set('viewState', ViewState.Progress);
            
            return map.toJS();

        case DeviceActionType.DeviceAbort:
            let viewState = state.devices && state.devices.length > 0 ? ViewState.View : ViewState.Empty;
  
            return { ...state, viewState: viewState, loading: false, error: null };

        case DeviceActionType.InitSuccess:  
            map = fromJS(state);
            // map attached device
            map = map.set('devices', _.map(action.payload.devices, (device: Device) => {
                if (device.object_id) {
                    device.attached_object = _.find(action.payload.objects, { 'id': device.object_id})
                }

                return device
            }));
            map = map.set('objects', action.payload.objects);
            map = map.set('error', null);
            map = map.set('loading', false);

            return map.toJS();
  
        case DeviceActionType.DeviceData:
 
            return { ...state, viewState:  action.payload.state };

        case DeviceActionType.DeviceEmpty:
            
            return { ...state, viewState: ViewState.Empty, devices: [], selectId: null };


        case DeviceActionType.InitFailure:
 
            return { ...state, error: action.payload, loading: false };

        case DeviceActionType.DeviceSelect:
            let id = null;
            const oldId = state.selectId;
            const collection = state.devices;

            if (collection && collection.length > 0) {
                let index = _.findIndex(collection, (item) => item.id === action.payload);
                if (index === -1) {
                    const oldIndex = _.findIndex(collection, (item) => item.id === oldId);
                    if (oldIndex === -1) {
                        index = 0;
                    } else {
                        index = oldIndex < collection.length ? oldIndex : oldIndex - 1;
                    }

                    id = collection[index] ? collection[index].id : null;
                } else {
                    id = action.payload;
                }
            }
            let changes: any = { };
            if (state.selectId !== id) {
                  changes.error = null;
            }
            changes.selectId = id;
            changes.viewState = (!state.devices || state.devices.length === 0) ? ViewState.Empty : ViewState.View

            const urlState = state.urlState;
            if (urlState.device_id !== action.payload) {
                urlState.device_id = action.payload;
                changes.urlState = urlState;
            }
 
            return Object.assign({}, state, changes)

        case DeviceActionType.DeviceChangeState:
 
            return { ...state, viewState: action.payload, error: null };

        case DeviceActionType.DeviceUpdate:

            return { ...state, loading: true, error: null };

        case DeviceActionType.DeviceUpdateSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const updateIndex = _.findIndex(state.devices, { id: action.payload.id }),
                updateDevices = state.devices;
            updateDevices[updateIndex] = action.payload;

            updateDevices[updateIndex].attached_object = updateDevices[updateIndex].object_id ? _.find(state.objects, { 'id': updateDevices[updateIndex].object_id}) : null;
            map = map.set('devices', updateDevices);
            
            return map.toJS();

        case DeviceActionType.DeviceUpdateFailure:
 
            return { ...state, loading: false, error: action.payload };

        case DeviceActionType.DeviceChangeCancel:
            const stateAfterCancel = state.devices && state.devices.length > 0 ? ViewState.View : ViewState.Empty;
            return {
                ...state,
                viewState: stateAfterCancel,
                error: null,
                loading: false
            };

        case DeviceActionType.DeviceCreate:
 
            return { ...state, loading: true, error: null };


        case DeviceActionType.DeviceCreateSuccess:
            map = fromJS(state);
            map = map.set('viewState', ViewState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const createDevices = state.devices;
            createDevices.push(action.payload);
            map = map.set('devices', createDevices);

            return map.toJS();

        case DeviceActionType.DeviceCreateFailure:
 
            return { ...state, loading: false, error: action.payload };

        case DeviceActionType.DeviceDelete:
 
            return { ...state, loading: true, error: null };

        case DeviceActionType.DeviceDeleteSuccess:
            map = fromJS(state);
            map = map.set('error', null);
            map = map.set('loading', false);
            const devices = _.filter(_.cloneDeep(state.devices), element => element.id !== action.payload);
            map = map.set('devices', devices);
            map = map.set('viewState', devices && devices.length > 0 ? ViewState.View : ViewState.Empty);

            return map.toJS();

        case DeviceActionType.DeviceDeleteFailure:
 
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

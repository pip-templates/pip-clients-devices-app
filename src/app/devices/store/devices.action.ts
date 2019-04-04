import { Action } from '@ngrx/store';
import { Device } from '../models';

export enum DeviceActionType {
    Init = '[Devices] Init',
    DeviceAbort = '[Devices] Abort',
    DeviceEmpty = '[Devices] Empty',
    DeviceData = '[Devices] Data',
    InitSuccess = '[Devices] Success',
    InitFailure = '[Devices] Failure',
    DeviceSelect = '[Devices] Select',
    DeviceChangeState = '[Devices] ChangeState',
    DeviceCreate = '[Devices] Create',
    DeviceCreateSuccess = '[Devices] Create Success',
    DeviceCreateFailure = '[Devices] Create Failure',
    DeviceChangeCancel = '[Devices] ChangeCancel',
    DeviceUpdate = '[Devices] Update',
    DeviceUpdateSuccess = '[Devices] UpdateSuccess',
    DeviceUpdateFailure = '[Devices] UpdateFailure',
    DeviceDelete = '[Devices] Delete',
    DeviceDeleteSuccess = '[Devices] DeleteSuccess',
    DeviceDeleteFailure = '[Devices] DeleteFailure'
}


export class InitAction implements Action {
    readonly type = DeviceActionType.Init;

    constructor() { }
}

export class DeviceAbortAction implements Action {
    readonly type = DeviceActionType.DeviceAbort;

    constructor(public payload: any) { }
}

export class DeviceEmptyAction implements Action {
    readonly type = DeviceActionType.DeviceEmpty;

    constructor() { }
}

export class DeviceDataAction implements Action {
    readonly type = DeviceActionType.DeviceData;

    constructor(public payload: any) { }
}

export class InitSuccessAction implements Action {
    readonly type = DeviceActionType.InitSuccess;

    constructor(public payload: any) { }
}

export class InitFailureAction implements Action {
    readonly type = DeviceActionType.InitFailure;

    constructor(public payload: string) { }
}

export class DeviceSelectAction implements Action {
    readonly type = DeviceActionType.DeviceSelect;

    constructor(public payload: string) { }
}

export class DeviceChangeStateAction implements Action {
    readonly type = DeviceActionType.DeviceChangeState;

    constructor(public payload: string) { }
}

export class DeviceCreateAction implements Action {
    readonly type = DeviceActionType.DeviceCreate;

    constructor(public payload: Device) { }
}

export class DeviceCreateSuccessAction implements Action {
    readonly type = DeviceActionType.DeviceCreateSuccess;

    constructor(public payload: Device) { }
}

export class DeviceCreateFailureAction implements Action {
    readonly type = DeviceActionType.DeviceCreateFailure;

    constructor(public payload: string) { }
}

export class DeviceChangeCancelAction implements Action {
    readonly type = DeviceActionType.DeviceChangeCancel;

    constructor(public payload: Device[]) { }
}

export class DeviceUpdateAction implements Action {
    readonly type = DeviceActionType.DeviceUpdate;

    constructor(public payload: Device) { }
}

export class DeviceUpdateSuccessAction implements Action {
    readonly type = DeviceActionType.DeviceUpdateSuccess;

    constructor(public payload: Device) { }
}

export class DeviceUpdateFailureAction implements Action {
    readonly type = DeviceActionType.DeviceUpdateFailure;

    constructor(public payload: string) { }
}

export class DeviceDeleteAction implements Action {
    readonly type = DeviceActionType.DeviceDelete;

    constructor(public payload: string) { }
}

export class DeviceDeleteSuccessAction implements Action {
    readonly type = DeviceActionType.DeviceDeleteSuccess;

    constructor(public payload: string) { }
}

export class DeviceDeleteFailureAction implements Action {
    readonly type = DeviceActionType.DeviceDeleteFailure;

    constructor(public payload: string) { }
}


export type DeviceAction = InitAction 
    | DeviceAbortAction
    | DeviceEmptyAction
    | DeviceDataAction
    | InitSuccessAction
    | InitFailureAction
    | DeviceSelectAction
    | DeviceChangeStateAction
    | DeviceCreateAction
    | DeviceCreateSuccessAction
    | DeviceCreateFailureAction
    | DeviceChangeCancelAction
    | DeviceUpdateAction
    | DeviceUpdateSuccessAction
    | DeviceUpdateFailureAction
    | DeviceDeleteAction
    | DeviceDeleteSuccessAction
    | DeviceDeleteFailureAction;

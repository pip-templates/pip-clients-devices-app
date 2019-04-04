import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { findIndex } from 'lodash';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as fromDeviceActions from './devices.action';

import { DeviceDataService } from '../services/devices.data.service';
import { ViewState } from '../models';
import { ControlObjectDataService } from '../services/objects.data.service';

import * as _ from 'lodash';

@Injectable()
export class DeviceEffects {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private deviceDataService: DeviceDataService,
        private objectDataServiceDataService: ControlObjectDataService
    ) { }

    @Effect() init$: Observable<Action> = this.actions$.pipe(
        ofType(
            fromDeviceActions.DeviceActionType.Init,
            fromDeviceActions.DeviceActionType.DeviceAbort
        ),
        switchMap((action: any) => {
            if (action.type = fromDeviceActions.DeviceActionType.Init) {
                return forkJoin(
                    this.deviceDataService.readDevices(),
                    this.objectDataServiceDataService.readControlObjects()
                ).pipe(
                    map(data => {
                        return new fromDeviceActions.InitSuccessAction({ devices: data[0], objects: data[1] })
                    }),
                    catchError(error => of(new fromDeviceActions.InitFailureAction(error))))              
            } else {
                return of();
            }
        })
    );

    @Effect() initSuccess$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.InitSuccess),
        map((action: any) => action.payload),
        map(payload => {
            const saveState = this.activatedRoute.snapshot.queryParams['state'];

            if (payload && payload.devices && payload.devices.length > 0) {
                // select device by id
                let index: number = findIndex(payload.devices, { id: this.activatedRoute.snapshot.queryParams['device_id'] });
                index = index > -1 ? index : 0;
                if (!saveState || saveState === ViewState.View || saveState === ViewState.Edit) {
                    return new fromDeviceActions.DeviceDataAction({ state: ViewState.View, id: payload.devices[index].id });
                }
                return new fromDeviceActions.DeviceChangeStateAction(ViewState.Create);
            }
            return new fromDeviceActions.DeviceEmptyAction();
        })
    );

    @Effect() deviceData$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceData),
        map((action: any) => action.payload),
        map(payload => {
            return new fromDeviceActions.DeviceSelectAction(payload.id);
        })
    );

    @Effect({ dispatch: false }) deviceChangeState$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceChangeState),
        tap(action => {
            const actionWithPayload = <any>action;
            this.router.navigate([], { queryParams: { state: actionWithPayload.payload }, queryParamsHandling: 'merge' });
        })
    );

    @Effect({ dispatch: false }) deviceChangeCancel$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceChangeCancel),
            map((action: any) => action.payload),
            map(payload => {
                this.router.navigate([], {
                    queryParams: { state: payload && payload.length > 0 ? ViewState.View : ViewState.Empty },
                    queryParamsHandling: 'merge'
                });

                return new fromDeviceActions.DeviceChangeCancelAction(payload);
            })
        );

    @Effect({ dispatch: false }) deviceSelect$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceSelect),
            tap(action => {
                const actionWithPayload = <any>action;
                this.router.navigate([], {
                    queryParams: { device_id: actionWithPayload.payload, state: ViewState.View },
                    queryParamsHandling: 'merge'
                });
            })
        );

    @Effect() deviceUpdate$: Observable<Action> = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceUpdate),
            switchMap((action: any) => {
                if (action.type = fromDeviceActions.DeviceActionType.DeviceUpdate) {
                    const payload = (<any>action).payload;
                    return this.deviceDataService.deviceUpdate(payload)
                        .pipe(
                            map(data => {
                                this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                                return new fromDeviceActions.DeviceUpdateSuccessAction(data);
                            }),
                            catchError(error => of(new fromDeviceActions.DeviceUpdateFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() deviceCreate$: Observable<Action> = this.actions$.pipe(
    ofType(fromDeviceActions.DeviceActionType.DeviceCreate),
            switchMap((action: any) => {
                if (action.type = fromDeviceActions.DeviceActionType.DeviceCreate) {
                    const payload = (<any>action).payload;
                    return this.deviceDataService.deviceCreate(payload)
                        .pipe(
                            map(data => {
                                return new fromDeviceActions.DeviceCreateSuccessAction(data);
                            }),
                            catchError(error => of(new fromDeviceActions.DeviceCreateFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() deviceCreateSuccess$ = this.actions$.pipe(
    ofType(fromDeviceActions.DeviceActionType.DeviceCreateSuccess),
            map((action: any) => action.payload),
            map(payload => {
                const deviceId = payload ? payload.id : null;
                this.router.navigate([], { queryParams: { state: ViewState.View }, queryParamsHandling: 'merge' });

                return new fromDeviceActions.DeviceSelectAction(deviceId);
            })
        );

    @Effect() deviceDelete$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceDelete),
            switchMap((action: any) => {
                if (action.type = fromDeviceActions.DeviceActionType.DeviceDelete) {
                    const payload = (<any>action).payload;
                    return this.deviceDataService.deviceDelete(payload)
                        .pipe(
                            map(data => {
                                return new fromDeviceActions.DeviceDeleteSuccessAction(payload);
                            }),
                            catchError(error => of(new fromDeviceActions.DeviceDeleteFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() deviceDeleteSuccess$ = this.actions$.pipe(
        ofType(fromDeviceActions.DeviceActionType.DeviceDeleteSuccess),
            map((action: any) => action.payload),
            map(payload => {
                return new fromDeviceActions.DeviceSelectAction(null);
            })
        );
}

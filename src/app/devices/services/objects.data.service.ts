import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SessionConfig, SESSION_CONFIG } from 'pip-clients-shell';
import { ControlObject } from '../models';

import * as _ from 'lodash';

@Injectable()
export class ControlObjectDataService {

    private PRE_RESOURCE = '/api/v1';
    private RESOURCE = 'control_objects';
    
    private _siteId: string;
 
    public constructor(
        private http: HttpClient,
        @Inject(SESSION_CONFIG) private config: SessionConfig,
    ) { }

    public set siteId(value: string) {
        this._siteId = value;
    }

    public get siteId(): string {
        return this._siteId;
    }

    public get serverUrl(): string {
        if (this._siteId) 
            return this.config.serverUrl + this.PRE_RESOURCE + '/' + this._siteId + '/' + this.RESOURCE;
        else
            return this.config.serverUrl + this.PRE_RESOURCE + '/' + this.RESOURCE;
    }

    private handleError(response: Response) {
        return throwError(response);
    }


    public readControlObjects(): Observable<ControlObject[]> {
        const url = this.serverUrl;
        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response['data'];
                }),
                catchError(this.handleError)
            );
    }

    public controlObjectUpdate(controlObject: ControlObject): Observable<any> {
        const url = this.serverUrl + '/' + controlObject.id;
        const request: any = {};
        controlObject = _.defaults(controlObject, { site_id: this.siteId });

        return this.http.put(url, controlObject, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }


}

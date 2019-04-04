// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';

import * as _ from 'lodash';

import { defaultControlObjects } from './storage';
import { _ID, takeSiteId } from './utility'
 

let controlObjects = defaultControlObjects;


function takeControlObjectId(url): string {
    let match = url.match(/\/control_objects\/(.{32})/)
    if (match) 
        return match[1]
    else 
        return null
}

function updateControlObjects(request: HttpRequest<any>) {
    const id = takeControlObjectId(request.url);
 
    let index = _.findIndex(controlObjects, {id: id})
    if (index > -1) {
        controlObjects[index] = request.body
    }
}

@Injectable()
export class MockObjectsInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(
            mergeMap(() => {
                if (request.url.match(/\/api\/v1\/(.{32})\/control_objects/)) {
                    const siteId = takeSiteId(request.url);
                    let controlObjectsBySite = _.filter(controlObjects, { site_id: siteId })

                    if (request.method === 'GET') {
                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                total: controlObjectsBySite.length,
                                data: controlObjectsBySite
                            }
                        }));
                    }
                    if (request.method === 'POST') {
                        let controlObject = request.body
                        controlObject.id = _ID(32)
                        controlObjects.push(controlObject);
                        return of(new HttpResponse({
                            status: 200,
                            body: controlObject
                        }));
                    }                    
                }

                if (request.url.match(/\/api\/v1\/(.{32})\/control_objects\/(.{32})/)) {
                    if (request.method === 'PUT') {
                        updateControlObjects(request)
                        return of(new HttpResponse({
                            status: 200,
                            body: request.body
                        }));
                    }
                }

                return next.handle(request);
            }),
            materialize(),
            delay(200),
            dematerialize()
        );
    }
}

export let mockObjectsProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockObjectsInterceptor,
    multi: true
};

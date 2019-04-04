// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
 
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import * as _ from 'lodash';

import { defaultDevices } from './storage';
import { _ID, takeSiteId } from './utility';
import { Device } from '../devices/models';

let devices = defaultDevices;


function takeDeviceId(url): string {
    let match = url.match(/\/devices\/(.{32})/)
    if (match) 
        return match[1]
    else 
        return null
}

function updateDevices(request: HttpRequest<any>) {
    const id = takeDeviceId(request.url);
 
    let index = _.findIndex(devices, {id: id})
    if (index > -1) {
        devices[index] = request.body
    }
}

// Uniqueness validation
function verificationUDI(device: Device): boolean {
    let devicesBySite = _.filter(devices, { site_id: device.site_id });

    let searchQuery = device.udi.toLowerCase();
    let index = _.findIndex(devicesBySite, (d: Device) => {
        return searchQuery === d.udi.toLowerCase()
    });

    return (index === -1 || (device.id && devicesBySite[index].id === device.id)) 
}

@Injectable()
export class MockDevicesInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(
            mergeMap(() => {

                if (request.url.match(/\/api\/v1\/(.{32})\/devices/)) {
                    const siteId = takeSiteId(request.url);
                    let devicesBySite = _.filter(devices, { site_id: siteId });
                    
                    if (request.method === 'GET') {
                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                total: devicesBySite.length,
                                data: devicesBySite
                            }
                        }));
                    }
                    if (request.method === 'POST') {
                        let device = request.body
                        if (verificationUDI(device)) {
                            device.id = _ID(32)
                            devices.push(device);
                            return of(new HttpResponse({
                                status: 200,
                                body: device
                            }));
                        } else {
                            return throwError({
                                'code': 'DEVICE_ERROR_UDI_NOT_UNIQUE',
                                'status': 400,
                                'name': 'DEVICE_ERROR_UDI_NOT_UNIQUE',
                                'message': 'A device with this udi already exists',
                            });
                        }

                    }                    
                }

                if (request.url.match(/\/api\/v1\/(.{32})\/devices\/(.{32})/)) {
                    if (request.method === 'PUT') {
                        // generate random error
                        if (Math.random() < 0.05) {
                            return throwError({
                                'code': 'DEVICE_ERROR_UNKNOWN',
                                'status': 400,
                                'name': 'DEVICE_ERROR_UNKNOWN',
                                'message': 'Unknown error',
                            });
                        } else {
                            if (verificationUDI(request.body)) {
                                updateDevices(request)
                                return of(new HttpResponse({
                                    status: 200,
                                    body: request.body
                                }));
                            } else {
                                return throwError({
                                    'code': 'DEVICE_ERROR_UDI_NOT_UNIQUE',
                                    'status': 400,
                                    'name': 'DEVICE_ERROR_UDI_NOT_UNIQUE',
                                    'message': 'A device with this udi already exists',
                                });
                            }                            

                        }
                    }
                    if (request.method === 'DELETE') {
                        const id = takeDeviceId(request.url);
                        devices = _.remove(devices, { id: id})
                        return of(new HttpResponse({
                            status: 200,
                            body: { result: "OK"}
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

export let mockDevicesProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockDevicesInterceptor,
    multi: true
};

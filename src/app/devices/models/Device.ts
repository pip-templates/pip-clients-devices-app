import { Sensors } from './Sensors';
import { GeoDevices } from './GeoDevices';
import { ControlObject } from './ControlObject';

export class Device {
    public id: string;
    public site_id: string;
    public type: string;
    public model: string;
    public udi: string;
    public label?: string;
    public create_time?: Date;
    public status?: string;
    public version?: number;
    public deleted?: boolean;
    public object_id?: string;
    public rec_time?: Date;
    public ping_time?: Date; 
    public sensors?: Sensors[];
    public geolocation_devices?: GeoDevices[];
    // extension 
    public attached_object?: ControlObject;
}

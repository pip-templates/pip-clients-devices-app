import { Device, ControlObject, Sensors, GeoDevices } from '../devices/models'
import { takeRandomly } from './utility'


let GeoDeviceTypes: string[] = ["GPS", "RF Tag Reader", "Short Range Radar", "Ultra-wide Band (UWB)", "Unknown"];
let SensorInterfaces: string[] = ["Caterpillar-797F", "Generic TPMS", "Unknown Sensor"];

 
let defaultSensors: Sensors[] = [
    {
        id: '1',
        name: 'Caterpillar-797F',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Generic TPMS',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Unknown Sensor',
        status: 'Pending'
    }        
];

let defaultGeoDevices: GeoDevices[] = [
    {
        id: '1',
        type: 'GPS',
        offset_x: 0, // (m)
        offset_y: -1, // (m)
        dir_start: 15, // (deg)
        dir_end: -365, // (deg)
        distance: 100, // (m)
        status: 'Active'
    },
    {
        id: '2',
        type: 'RF Tag Reader',
        offset_x: 2, // (m)
        offset_y: 5, // (m)
        dir_start: 15, // (deg)
        dir_end: 90, // (deg)
        distance: 5, // (m)
        status: 'Active'
    },
    {
        id: '3',
        type: 'Short Range Radar',
        offset_x: -2, // (m)
        offset_y: 2, // (m)
        dir_start: 0, // (deg)
        dir_end: 180, // (deg)
        distance: 500, // (m)
        status: 'Active'
    },
    {
        id: '4',
        type: 'Unknown',
        offset_x: null, // (m)
        offset_y: null, // (m)
        dir_start: 90, // (deg)
        dir_end: 270, // (deg)
        distance: null, // (m)
        status: 'Pending'
    },
    {
        id: '5',
        type: 'Ultra-wide Band (UWB)',
        offset_x: null, // (m)
        offset_y: null, // (m)
        dir_start: null, // (deg)
        dir_end: null, // (deg)
        distance: null, // (m)
        status: 'Inactive'
    }               
];

export let defaultDevices: Device[] = [
    {
        id: "00000000000000000000000000000001",
        site_id: "00000000000000000000000000000000",
        type: "unknown",
        model: "PIP M13",
        udi: "23423423423",
        label: "T102",
        create_time: new Date(),
        status: 'Active',
        version: 1,
        deleted: false,
        object_id: "10000000000000000000000000000001",
        sensors: takeRandomly(defaultSensors),
        geolocation_devices:  takeRandomly(defaultGeoDevices)
    },
    {
        id: "00000000000000000000000000000002",
        site_id: "00000000000000000000000000000000",
        type: "unknown",
        model: "T-34",
        udi: "11112222333344444",
        label: "T101",
        create_time: new Date(),
        status: 'Active',
        version: 1,
        deleted: false,
        object_id: "20000000000000000000000000000001",
        sensors: takeRandomly(defaultSensors),
        geolocation_devices:  takeRandomly(defaultGeoDevices)
    },
    {
        id: "00000000000000000000000000000003",
        site_id: "00000000000000000000000000000001",
        type: "unknown",
        model: "GR-06",
        udi: "55552222333344444",
        label: "C-545",
        create_time: new Date(),
        status: 'Blocked',
        version: 1,
        deleted: false,
        object_id: null,
        sensors: takeRandomly(defaultSensors),
        geolocation_devices:  takeRandomly(defaultGeoDevices)
    }                                       
]
 
export let defaultControlObjects: ControlObject[] = [
    {
        id: "10000000000000000000000000000001",
        site_id: "00000000000000000000000000000000",
        category: 'equipment',
        type: "excavator",
        deleted: false,
        name: 'T101',
        description: '',
        device_id: "00000000000000000000000000000001",
        group_ids: [],
        icon: 'obj-type'
    },
    {
        id: "10000000000000000000000000000002",
        site_id: "00000000000000000000000000000000",
        category: 'asset',
        type: "pump",
        deleted: false,
        name: 'P101',
        description: '',
        device_id: null,
        group_ids: [],
        icon: 'obj-type'
    },
    {
        id: "20000000000000000000000000000001",
        site_id: "00000000000000000000000000000000",
        category: 'equipment',
        type: "dumpcar",
        deleted: false,
        name: 'T102',
        description: '',
        device_id: '00000000000000000000000000000002',
        group_ids: [],
        icon: 'obj-type'
    },
    {
        id: "10000000000000000000000000000001",
        site_id: "00000000000000000000000000000001",
        category: 'equipment',
        type: "haul",
        deleted: false,
        name: 'T103',
        description: '',
        device_id: null,
        group_ids: [],
        icon: 'obj-type'
    },
    {
        id: "10000000000000000000000000000002",
        site_id: "00000000000000000000000000000002",
        category: 'asset',
        type: "crane",
        deleted: false,
        name: 'C101',
        description: '',
        device_id: null,
        group_ids: [],
        icon: 'obj-type'
    },
    {
        id: "30000000000000000000000000000001",
        site_id: "00000000000000000000000000000002",
        category: 'equipment',
        type: "haul",
        deleted: false,
        name: 'T104',
        description: '',
        device_id: null,
        group_ids: [],
        icon: 'obj-type'
    }                                  
]
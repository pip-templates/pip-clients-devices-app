export class ControlObject {
    id: string;
    site_id: string;
    category: string;
    type: string;
    deleted: boolean;
    name: string;
    description: string;
    phone?: string;
    pin?: string;
    email?: string;
    device_id?: string;
    group_ids: string[];
    icon?: any;
}
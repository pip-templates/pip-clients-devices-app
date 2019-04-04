import * as _ from 'lodash';

export function _ID(length) {
    if (!length) {
        length = 8
    }
    var str = ''
    for (var i = 1; i < length + 1; i = i + 8) {
        str += Math.random().toString(36).substr(2, 10)
    }
    return ('' + str).substr(0, length)
}


export function takeSiteId(url): string {
    let match = url.match(/\/api\/v1\/(.{32})/)
    if (match) 
        return match[1]
    else 
        return null
}

export function takeRandomly(arr: any[]): any[] {
    arr = _.shuffle(arr);
    let size: number = Math.floor(Math.random()*arr.length);

    return _.take(arr, size);
}
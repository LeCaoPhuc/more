import { Injectable } from '@angular/core';
@Injectable()
export class ShareDataService {
    public data = {};

    constructor() {

    }

    setData(key: any, value: any) {
        if (key)
            this.data[key] = value;
    }

    getData(key: any) {
        return this.data[key];
    }

    fetchData(key: any) {
        return this.data[key].fetch();
    }
}
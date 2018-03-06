import DataStoreItem from './DataStoreItem';
export default class DataStore {
    constructor(className, ncmb) {
        this.className = className;
        this.ncmb = ncmb;
    }
    item(fields) {
        return new DataStoreItem(this.className, this.ncmb, fields);
    }
}
//# sourceMappingURL=DataStore.js.map
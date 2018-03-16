import Objects from './Objects';
export default class DataStoreItem extends Objects {
    constructor(className, ncmb, fields) {
        super();
        this.className = className;
        this.ncmb = ncmb;
        if (fields) {
            this.setFields(fields);
        }
    }
}
//# sourceMappingURL=DataStoreItem.js.map
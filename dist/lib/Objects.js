import Core from './Core';
export default class Objects extends Core {
    static getEndpoint(className, objectId) {
        let endpoint = ['users', 'roles', 'installations', 'files']
            .indexOf(className) > -1 ? `${className}` : `classes/${className}`;
        if (objectId)
            endpoint = `${endpoint}/${objectId}`;
        return endpoint;
    }
    create(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'POST',
            endpoint: Objects.getEndpoint(options.className),
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        })
            .catch(err => { throw err; });
    }
    read(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'GET',
            endpoint: Objects.getEndpoint(options.className, options.objectId),
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    update(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'PUT',
            endpoint: Objects.getEndpoint(options.className, options.objectId),
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    delete(options) {
        console.log('options', options);
        return this.ncmb.api({
            method: 'DELETE',
            endpoint: Objects.getEndpoint(options.className, options.objectId),
            sessionToken: false
        });
    }
    static search(options) {
        const header = {
            query: {},
            method: 'GET',
            endpoint: this.getEndpoint(options.className),
            sessionToken: false
        };
        if (options.where instanceof Object)
            header.query.where = JSON.stringify(options.where);
        header.query.limit = options.limit;
        return this.ncmb.api(header).then((res) => {
            return res.json();
        });
    }
    setFields(fields) {
        for (let key in fields) {
            this.set(key, fields[key]);
        }
        return this;
    }
    set(key, value) {
        this[key] = value;
        return this;
    }
    fields() {
        const fields = {};
        for (let key in this) {
            if (['ncmb', 'className'].indexOf(key) > -1) {
                continue;
            }
            fields[key] = this[key];
        }
        return fields;
    }
}
//# sourceMappingURL=Objects.js.map
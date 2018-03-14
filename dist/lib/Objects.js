import Core from './Core';
export default class Objects extends Core {
    getEndpoint(className, objectId) {
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
            endpoint: this.getEndpoint(options.className),
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        })
            .catch((err) => {
            return new Error(err);
        });
    }
    read(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'GET',
            endpoint: this.getEndpoint(options.className, options.objectId),
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
            endpoint: this.getEndpoint(options.className, options.objectId),
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
            endpoint: this.getEndpoint(options.className, options.objectId),
            sessionToken: false
        });
    }
    search(options) {
        console.log('options', options);
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
}
//# sourceMappingURL=Objects.js.map
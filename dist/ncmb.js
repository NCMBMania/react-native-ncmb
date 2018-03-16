import User from './lib/User';
import Objects from './lib/Objects';
import Role from './lib/Role/index';
import { signature, api } from './utils/index';
import DataStore from './lib/DataStore';
import Installation from './lib/Installation';
import Acl from './lib/Acl';
export default class NCMB {
    constructor(applicationKey, clientKey, config) {
        this.applicationKey = null;
        this.clientKey = null;
        this.currentUser = null;
        this.version = '2013-09-01';
        this.scriptVersion = '2015-09-01';
        this.fqdn = 'mb.api.cloud.nifty.com';
        this.scriptFqdn = 'script.mb.api.cloud.nifty.com';
        this.port = 443;
        this.protocol = 'https:';
        this.signatureMethod = 'HmacSHA256';
        this.signatureVersion = 2;
        this.stub = false;
        this.url = `${this.protocol}//${this.fqdn}/${this.version}`;
        this.object = new Objects(this);
        this.role = new Role(this);
        this.setCurrentUser = (res) => {
            this.currentUser = res;
        };
        this.getCurrentUser = () => {
            if (this.currentUser) {
                return this.currentUser;
            }
            throw new Error('currentUser is undefind');
        };
        this.deleteCurrentUser = () => {
            this.currentUser = null;
        };
        this.getApplicationKey = () => {
            if (typeof this.applicationKey === 'string')
                return this.applicationKey;
            throw new Error('Please set the applicationKey');
        };
        this.getClientKey = () => {
            if (typeof this.clientKey === 'string')
                return this.clientKey;
            throw new Error('Please set the clientKey');
        };
        this.createSignature = (options) => {
            return signature(this, options);
        };
        this.api = (options) => {
            let status;
            return api(this, options)().then((res) => {
                status = res.ok;
                return res.json();
            }).then((json) => {
                if (status) {
                    return json;
                }
                else {
                    throw new Error(JSON.stringify(json));
                }
            });
        };
        this.DataStore = (name) => {
            if (!name) {
                throw new Error('Please set the className');
            }
            const dataStore = new DataStore(name, this);
            return dataStore;
        };
        this.applicationKey = applicationKey;
        this.clientKey = clientKey;
        if (config instanceof Object) {
            this.fqdn = config.fqdn || this.fqdn;
            this.scriptFqdn = config.scriptFqdn || this.scriptFqdn;
            this.port = config.port || this.port;
            this.protocol = config.protocol || this.protocol;
            this.stub = config.stub || this.stub;
        }
        this.Installation = new Installation(this);
        this.Acl = Acl;
        Acl.ncmb = this;
        this.User = User;
        this.User.ncmb = this;
    }
    set(keys) {
        this.applicationKey = keys.applicationKey;
        this.clientKey = keys.clientKey;
    }
}
//# sourceMappingURL=ncmb.js.map
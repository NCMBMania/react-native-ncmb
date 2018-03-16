import Objects from './Objects';
export default class User extends Objects {
    constructor(fields) {
        super();
        this.ncmb = User.ncmb;
        if (fields) {
            this.setFields(fields);
        }
    }
    static login(userName, password) {
        return this.ncmb
            .api({
            query: {
                userName: userName,
                password: password
            },
            method: 'GET',
            endpoint: 'login',
            sessionToken: false
        })
            .then((res) => {
            this.ncmb.setCurrentUser(res);
            return new this.ncmb.User(res);
        }, err => { throw err; });
    }
    static logout() {
        return this.ncmb
            .api({
            method: 'GET',
            endpoint: 'logout',
            sessionToken: false
        })
            .then(() => {
            this.ncmb.deleteCurrentUser();
        });
    }
    signUpByAccount() {
        return this.create({
            query: this.fields(),
            className: User.className
        })
            .then((data) => {
            return this.setFields(data);
        }, err => { throw err; });
    }
    static update(query) {
        return this.ncmb
            .api({
            query,
            method: 'PUT',
            endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
            sessionToken: true
        })
            .then((res) => {
            return res.json();
        });
    }
    fetch() {
        return this.ncmb
            .api({
            method: 'GET',
            endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
            sessionToken: true
        })
            .then((res) => {
            return res.json();
        });
    }
    static delete() {
        return this.ncmb
            .api({
            method: 'DELETE',
            endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
            sessionToken: true
        })
            .then(res => {
            this.ncmb.deleteCurrentUser();
            return res;
        });
    }
    static requestMailAddressUserEntry(query) {
        return this.ncmb
            .api({
            query,
            method: 'POST',
            endpoint: 'requestMailAddressUserEntry',
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    static requestPasswordReset(query) {
        return this.ncmb
            .api({
            query,
            method: 'POST',
            endpoint: 'requestPasswordReset',
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
}
User.className = 'users';
//# sourceMappingURL=User.js.map
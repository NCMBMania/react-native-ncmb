import ncmb from '../ncmb'
import { Generic, MailAddress } from '../types/index'
import Objects from './Objects'

export default class User extends Objects {
  public ncmb: ncmb
  static className = 'users'
  
  constructor(fields? :object) {
    super()
    this.ncmb = User.ncmb
    if (fields) {
      this.setFields(fields)
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
      .then((res: any) => {
        this.ncmb.setCurrentUser(res)
        return new this.ncmb.User(res)
      }, err => throw err)
  }

  static logout() {
    return this.ncmb
      .api({
        method: 'GET',
        endpoint: 'logout',
        sessionToken: false
      })
      .then(() => {
        this.ncmb.deleteCurrentUser()
      })
  }
  
  signUpByAccount() {
    return this.create({
      query: this.fields(),
      className: User.className
    })
    .then((data) => {
      return this.setFields(data)
    }, err => throw err)
  }

  static update(query: Generic) {
    return this.ncmb
      .api({
        query,
        method: 'PUT',
        endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
        sessionToken: true
      })
      .then((res: any) => {
        return res.json()
      })
  }

  fetch() {
    return this.ncmb
      .api({
        method: 'GET',
        endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
        sessionToken: true
      })
      .then((res: any) => {
        return res.json()
      })
  }

  static delete() {
    return this.ncmb
      .api({
        method: 'DELETE',
        endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
        sessionToken: true
      })
      .then(res => {
        this.ncmb.deleteCurrentUser()
        return res
      })
  }

  static requestMailAddressUserEntry(query: MailAddress) {
    return this.ncmb
      .api({
        query,
        method: 'POST',
        endpoint: 'requestMailAddressUserEntry',
        sessionToken: false
      })
      .then((res: any) => {
        return res.json()
      })
  }

  static requestPasswordReset(query: MailAddress) {
    return this.ncmb
      .api({
        query,
        method: 'POST',
        endpoint: 'requestPasswordReset',
        sessionToken: false
      })
      .then((res: any) => {
        return res.json()
      })
  }
}

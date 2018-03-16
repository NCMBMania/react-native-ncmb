import ncmb from '../ncmb'
import { Generic } from '../types/index'
import Objects from './Objects'

export default class Acl extends Objects {
  static ncmb: ncmb;
  
  constructor() {
    super()
    this.ncmb = ncmb
    this.fields = {}
  }
  
  setRoleReadAccess(roleName: string, access: boolean) {
    roleName = `role:${roleName}`
    if (!this.fields[roleName]) this.fields[roleName] = {}
    this.fields[roleName].read = access  
    return this
  }
  
  setPublicReadAccess(access: boolean) {
    if (!this.fields['*']) this.fields['*'] = {}
    this.fields['*'].read = access
    return this
  }
  
  setUserReadAccess(user: object, access: boolean) {
    if (!this.fields[user.objectId]) this.fields[user.objectId] = {}
    this.fields[user.objectId].read = access
    return this
  }

  setRoleWriteAccess(roleName: string, access: boolean) {
    roleName = `role:${roleName}`
    if (!this.fields[roleName]) this.fields[roleName] = {}
    this.fields[roleName].write = access  
    return this
  }
  
  setPublicWriteAccess(access: boolean) {
    if (!this.fields['*']) this.fields['*'] = {}
    this.fields['*'].write = access
    return this
  }
  
  setUserWriteAccess(user: object, access: boolean) {
    if (!this.fields[user.objectId]) this.fields[user.objectId] = {}
    this.fields[user.objectId].write = access
    return this
  }
  
  toJSON() {
    for (let key in this.fields) {
      if (!this.fields[key].read)
        delete this.fields[key].read
      if (!this.fields[key].write)
        delete this.fields[key].write
    }
    console.log(this.fields)
    return this.fields
  }
}

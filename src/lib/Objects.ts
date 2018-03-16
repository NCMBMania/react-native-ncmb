import { Generic, Query, ClassName, ObjectId } from '../types/index'
import Core from './Core'

export interface Create extends Query, ClassName {}
export interface Options extends Query, ClassName, ObjectId {}

export default class Objects extends Core {
  static getEndpoint(className: string, objectId: string) {
    let endpoint = ['users', 'roles', 'installations', 'files']
      .indexOf(className) > -1 ? `${className}` : `classes/${className}`
    if (objectId)
      endpoint = `${endpoint}/${objectId}`
    return endpoint
  }
  
  create(options: Create) {
    return this.ncmb
      .api({
        query: options.query,
        method: 'POST',
        endpoint: Objects.getEndpoint(options.className),
        sessionToken: false
      })
      .then((res: any) => {
        return res.json()
      })
      .catch(err => throw err)
  }
  
  read(options: Options) {
    return this.ncmb
    .api({
      query: options.query,
      method: 'GET',
      endpoint: Objects.getEndpoint(options.className, options.objectId),
      sessionToken: false
    })
    .then((res: any) => {
      return res.json()
    })
  }
  
  update(options: Options) {
    return this.ncmb
    .api({
      query: options.query,
      method: 'PUT',
      endpoint: Objects.getEndpoint(options.className, options.objectId),
      sessionToken: false
    })
    .then((res: any) => {
      return res.json()
    })
  }
  
  delete(options: Options) {
    console.log('options', options)
    return this.ncmb.api({
      method: 'DELETE',
      endpoint: Objects.getEndpoint(options.className, options.objectId),
      sessionToken: false
    })
  }
  
  static search(options: Options) {
    const header = {
      query: {},
      method: 'GET',
      endpoint: this.getEndpoint(options.className),
      sessionToken: false
    }
    if (options.where instanceof Object)
      header.query.where = JSON.stringify(options.where)
    header.query.limit = options.limit
    return this.ncmb.api(header).then((res: any) => {
      return res.json()
    })
  }

  setFields(fields: object) {
    for (let key in fields) {
      this.set(key, fields[key])
    }
    return this
  }
  
  set(key: string, value: any) {
    this[key] = value
    return this
  }
  
  fields() :object {
    const fields = {}
    for (let key in this) {
      if (['ncmb', 'className'].indexOf(key) > -1) {
        continue;
      }
      fields[key] = this[key]
    }
    return fields
  }
}

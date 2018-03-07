import { Generic, Query, ClassName, ObjectId } from '../types/index'
import Core from './Core'

export interface Create extends Query, ClassName {}
export interface Options extends Query, ClassName, ObjectId {}

export default class Objects extends Core {
  create(options: Create) {
    return this.ncmb
    .api({
      query: options.query,
      method: 'POST',
      endpoint: `classes/${options.className}/`,
      sessionToken: false
    })
    .then((res: any) => {
      return res.json()
    })
  }
  
  read(options: Options) {
    return this.ncmb
    .api({
      query: options.query,
      method: 'GET',
      endpoint: `classes/${options.className}/${options.objectId}`,
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
      endpoint: `classes/${options.className}/${options.objectId}`,
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
      endpoint: `classes/${options.className}/${options.objectId}`,
      sessionToken: false
    })
  }
  
  search(options: Options) {
    console.log('options', options)
    const header = {
      query: {},
      method: 'GET',
      endpoint: `classes/${options.className}`,
      sessionToken: false
    }
    if (options.where instanceof Object)
      header.query.where = JSON.stringify(options.where)
    header.query.limit = options.limit
    return this.ncmb.api(header).then((res: any) => {
      return res.json()
    })
  }
}

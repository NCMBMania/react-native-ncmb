import ncmb from '../ncmb'
import { Generic } from '../types/index'
import Objects from './Objects'

export default class DataStoreItem extends Objects {
  private className: string;
  private ncmb: ncmb;
  
  constructor(className: string, ncmb: ncmb, fields?: object) {
    super()
    this.className = className
    this.ncmb = ncmb
    if (fields) {
      this.setFields(fields)
    }
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
  
  save() {
    return this.create({
      query: this.fields(),
      className: this.className
    })
    .then((data) => {
      return this.setFields(data)
    })
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

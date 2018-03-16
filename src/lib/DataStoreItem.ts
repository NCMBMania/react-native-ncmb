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

  save() {
    return this.create({
      query: this.fields(),
      className: this.className
    })
    .then((data) => {
      return this.setFields(data)
    })
  }
  
  update() {
    let fields = this.fields()
    const objectId = fields.objectId
    delete fields.objectId
    delete fields.createDate
    delete fields.updateDate
    return super.update({
      objectId: objectId,
      query: fields,
      className: this.className      
    })
    .then((data) => {
      return this.setFields(data)
    })
  }
  
  delete() {
    return super.delete({
      objectId: this.objectId,
      className: this.className
    })
    .then((data) => {
      return {}
    })
  }
  
}

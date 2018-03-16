import ncmb from '../ncmb'
import { Generic } from '../types/index'
import Objects from './Objects'

export default class DataStore extends Objects {
  className: string
  ncmb: ncmb
  static query = {}
  static conditions = {limit: 20}
  
  constructor(ncmb: ncmb, fields?: object) {
    super()
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
  
  static equalTo(key, value) {
    return this.setOperand(key, value)
  }
  
  static notEqualTo(key, value) {
    return this.setOperand(key, value, "$ne")
  }
  
  static lessThan(key, value) {
    return this.setOperand(key, value, "$lt")
  }
  
  static lessThanOrEqualTo(key, value) {
    return this.setOperand(key, value, "$lte")
  }
  
  static greaterThan(key, value) {
    return this.setOperand(key, value, "$gt")
  }
  
  static greaterThanOrEqualTo(key, value) {
    return this.setOperand(key, value, "$gte")
  }
  
  static in(key, values) {
    if(!Array.isArray(values))
      throw new Error('Values must be array.')
    return this.setOperand(key, values, "$in")
  }
  
  static notIn(key, values) {
    if (!Array.isArray(values))
      throw new Error('Values must be array.')
    return this.setOperand(key, values, "$nin")
  }
  
  static exists(key, exist) {
    if(typeof exist === "undefined" )
      exist = true
    if (typeof exist !== "boolean")
      throw new Error('Exist must be boolean.')
    return this.setOperand(key, exist, "$exists")
  }
  
  static regularExpressionTo (key, regex){
    if (typeof regex !== "string")
      throw new Error('Regular expression must be string')
    return this.setOperand(key, regex, "$regex")
  }
  
  static inArray(key, values) {
    if (!Array.isArray(values))
      values = [values]
    return this.setOperand(key, values, "$inArray")
  }
  
  static notInArray(key, values) {
    if(!Array.isArray(values))
      values = [values]
    return this.setOperand(key, values, "$ninArray")
  }
  
  static allInArray(key, values) {
    if (!Array.isArray(values))
      values = [values]
    return this.setOperand(key, values, "$all")
  }
  
  static setOperand(key, value, operand) {
    if(typeof key !== "string"){
      throw new Error("Key must be string.")
    }
    if(value instanceof Date) {
      value = {
        __type: "Date",
        iso: value.toJSON()
      }
    }
    if (!this.query.where)
      this.query.where = {}
    if(operand === undefined){
      this.query.where[key] = value
      return this
    }
    this.query.where[key] = this.query.where[key] || {}
    this.query.where[key][operand] = value
    return this
  }
  
  static limit(number: integer) {
    this.conditions.limit = number
    return this
  }
  
  static fetchAll() {
    return this.search({
      where: this.query.where,
      limit: this.conditions.limit,
      className: this.className
    })
    .then((ary) => {
      let results = []
      for (let data of ary.results) {
        results.push(new DataStoreItem(this.className, this.ncmb, data))
      }
      return results
    })
  }
}

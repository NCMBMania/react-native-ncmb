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

  
}

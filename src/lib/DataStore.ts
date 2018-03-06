import ncmb from '../ncmb'
import { Generic } from '../types/index'
import DataStoreItem from './DataStoreItem'

export default class DataStore {
  className: string;
  ncmb: ncmb;
  constructor(className: string, ncmb: ncmb) {
    this.className = className
    this.ncmb = ncmb
  }
  
  item(fields?: object) {
    return new DataStoreItem(this.className, this.ncmb, fields)
  }
}

import { Generic, IDataStore } from './types/index'
import User from './lib/User'
import Objects from './lib/Objects'
import Role from './lib/Role/index'
import { signature, api } from './utils/index'
import DataStore from './lib/DataStore'
import Installation from './lib/Installation'

export interface CreateSignature {
  method: string
  endpoint: string
  nowTime: string
  query: { [key: string]: any }
}

export interface Api {
  method: string
  endpoint: string
  sessionToken: boolean
  query?: { [key: string]: any }
}

export interface Config {
  applicationKey: string
  clientKey: string
  fqdn: string
  scriptFqdn: string
  port: number
  stub: boolean
  protocol: string
}

export default class NCMB {
  applicationKey: string | null = null
  clientKey: string | null = null
  currentUser: null | { [key: string]: string } = null
  Installation: Installation
  
  version = '2013-09-01'
  scriptVersion = '2015-09-01'
  fqdn = 'mb.api.cloud.nifty.com'
  scriptFqdn = 'script.mb.api.cloud.nifty.com'
  port = 443
  protocol = 'https:'
  signatureMethod = 'HmacSHA256'
  signatureVersion = 2
  stub = false
  url = `${this.protocol}//${this.fqdn}/${this.version}`
  
  
  constructor(applicationKey: string, clientKey: string, config?: Config) {
    this.applicationKey = applicationKey
    this.clientKey = clientKey
    if (config instanceof Object) {
      this.fqdn = config.fqdn || this.fqdn
      this.scriptFqdn = config.scriptFqdn || this.scriptFqdn
      this.port = config.port || this.port
      this.protocol = config.protocol || this.protocol
      this.stub = config.stub || this.stub
    }
    this.Installation = new Installation(this)
  }
  
  user = new User(this)
  object = new Objects(this)
  role = new Role(this)
  
  set(keys: { applicationKey: string; clientKey: string }) {
    this.applicationKey = keys.applicationKey
    this.clientKey = keys.clientKey
  }
  
  setCurrentUser = (res: Generic) => {
    this.currentUser = res
  }
  
  getCurrentUser = () => {
    if (this.currentUser) {
      return this.currentUser
    }
    throw new Error('currentUser is undefind')
  }
  
  deleteCurrentUser = () => {
    this.currentUser = null
  }
  
  getApplicationKey = () => {
    if (typeof this.applicationKey === 'string') return this.applicationKey
    throw new Error('Please set the applicationKey')
  }
  
  getClientKey = () => {
    if (typeof this.clientKey === 'string') return this.clientKey
    throw new Error('Please set the clientKey')
  }
  
  createSignature = (options: CreateSignature) => {
    return signature(this, options)
  }
  
  api = (options: Api) => {
    return api(this, options)().then((res: any) => {
      if (res.ok) return res
      return res.json()
        .then((json) => {
          throw new Error(JSON.stringify(json))
        })
    })
  }
  
  DataStore = (name?: IDataStore.className) => {
    if (!name) {
      throw new Error('Please set the className')
    }
    const dataStore = new DataStore(name, this)
    return dataStore
  }
}

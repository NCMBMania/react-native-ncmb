export interface Generic {
  [key: string]: any
}
export interface MailAddress {
  mailAddress: string
}
export interface Query {
  query: Generic,
  limit: number
}
export interface IDataStore {
  className: string
}
export interface ObjectId {
  objectId: string
}

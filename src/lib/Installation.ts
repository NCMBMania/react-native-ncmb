import ncmb from '../ncmb'
import { Generic } from '../types/index'
import Objects from './Objects'
const PushNotification = require('react-native-push-notification')
const packageInfo = require('../../package')
const DeviceInfo = require('react-native-device-info')
import {Platform, PushNotificationIOS} from 'react-native';

export default class Installation extends Objects {
  className: string;
  ncmb: ncmb;
  query: object;
  condition: object;
  fields: object;
  
  constructor(ncmb: ncmb) {
    super()
    this.className = 'installations'
    this.ncmb = ncmb
    this.query = {}
    this.fields = {
      applicationName: DeviceInfo.getApplicationName(),
      appVersion: DeviceInfo.getReadableVersion(),
      channels: [],
      deviceToken: '',
      deviceType: '',
      sdkVersion: packageInfo.version,
      timeZone: DeviceInfo.getTimezone()
    }
    this.conditions = {
      limit: 20
    }
    
    PushNotification.configure({
      onNotification: (notification) => {
        this.setHandler(notification)
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData)
        }
      },
      senderID: null,
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: false
    })
  }
  
  getDeviceToken(senderId?: string) {
    return new Promise((res, rej) => {
      PushNotification.onRegister = (token) => {
        this.fields.deviceType = token.os
        this.fields.deviceToken = token.token
        // { token: '1200d08f2702a5d02169cea1e2c1d3392ff394747fb951835ccf672c4426be89',
        // os: 'ios' }
        res(token.token)
      }
      PushNotification.requestPermissions(senderId)
    })
  }
  setHandler(notification: object) {
    
  }
  
  setDeviceToken(senderId?: string) {
    return this.getDeviceToken()
      .then((token) => {
        return super.create({
          query: this.fields,
          className: this.className
        })
      })
      .then((obj) => {
        this.fields = obj
        return obj
      }, (err) => {
        throw new Error(err)
      })
  }
}

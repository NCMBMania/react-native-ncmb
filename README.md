# React-native-ncmb

http://mb.cloud.nifty.com/doc/current/rest/common/format.html

Use Nifty mobile backend 's REST API to correspond to React Native

## Install

```
yarn add react-native-ncmb
```

## Setting

### set your initialPage

```js
import NCMB from 'react-native-ncmb';

const applicationKey = 'YOUR_APPLICATION_KEY';
const clientKey = 'YOUR_CLIENT_KEY';

const ncmb = new NCMB(applicationKey, clientKey);
```

# Usage

## DataStore

### Create

```js
const Item = ncmb.DataStore('ReactNative');
const item = Item.item();
item
    .set('msg', 'Hello World')
    .set('test', 'Hoge')
    .save()
    .then((data) => {
      console.log(data);
      // -> DataStoreItem
    })
```

## Create with ACL

```js
const Item = ncmb.DataStore('ReactNative');
const item = Item.item();
const acl = new ncmb.Acl();
acl.setPublicReadAccess(true)
  .setPublicWriteAccess(true)
  .setRoleReadAccess('Pro', true)
  .setUserReadAccess(user, true);
item
  .set('msg', 'Hello World')
  .set('test', 'Hoge')
  .set('acl', acl)
  .save()
  .then((data) => {
  })
```

## Push notification

### Get token

```js
// senderId needs for Android
ncmb.Installation.getDeviceToken(senderId)
  .then((obj) => {
    // Get token
  }, (err) => {
    console.log(err);
  });
```

### Get & Set token

```js
// senderId needs for Android
ncmb.Installation.setDeviceToken()
  .then((obj) => {
    // Token object from NCMB
  }, (err) => {
    console.log(err);
  });
```

### Get notification

```js
ncmb.Installation.setHandler = (notification) => {
  // Get notification object
}
```

## [user Login](http://mb.cloud.nifty.com/doc/current/rest/user/userLogin.html)

```
NCMB.User.login('user01', 'test1234')
.then(user => {
  console.log(user)
}).catch(error => {
  // type Error
});
```

### result

```
User {
  "objectId":"09Mp23m4bEOInUqT",
  "userName":"user01",
  "mailAddress":null,
  "mailAddressConfirm":null,
  "sessionToken":"ebDH8TtmLoygzjqjaI4EWFfxc",
  "createDate":"2013-08-28T07:46:09.801Z",
  "updateDate":"2013-08-30T05:32:03.868Z"
}
```

## [user Logout](http://mb.cloud.nifty.com/doc/current/rest/user/userLogout.html)

### Only after login

```
NCMB.User.logout()
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

// type Promise

## [Register User](http://mb.cloud.nifty.com/doc/current/rest/user/userRegistration.html)

```
const userName = 'reactTest';
const password = 'reactTest';

const user = new ncmb.User();
user
  .set('userName', userName)
  .set('password', password)
  .signUpByAccount()
  .then((user) => {
    console.log('user', user);
  }, (err) => {
    console.log(err)
  })
```

### result

```
User {
  "createDate":"2013-08-28T11:27:16.446Z",
  "objectId":"epaKcaYZqsREdSMY",
  "sessionToken":"iXDIelJRY3ULBdms281VTmc5O",
  "userName":"user01",
  "authData":null
}
```

## [User Read](http://mb.cloud.nifty.com/doc/current/rest/user/userGet.html)

#### Only after login

```
NCMB.User.read()
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{
  "objectId":"epaKcaYZqsREdSMY",
  "userName":"YamadaTarou",
  "authData":null,
  "mailAddress":null,
  "mailAddressConfirm":null,
  "createDate":"2013-08-28T11:27:16.446Z",
  "updateDate":"2013-08-28T12:03:28.926Z",
  "acl":{
    "*":{
      "read":true,
      "write":true
    }
  }
}
```

## [User Update](http://mb.cloud.nifty.com/doc/current/rest/user/userUpdate.html)

#### Only after login

```
NCMB.User.update({
  mailAddress: "new_address@mail"
  etc...
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{"updateDate":"2013-08-28T12:21:17.087Z"}
```

## [User Delete](http://mb.cloud.nifty.com/doc/current/rest/user/userDelete.html)

#### Only after login

```
NCMB.User.delete()
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
// type Promise
```

## [Password Registration](http://mb.cloud.nifty.com/doc/current/rest/user/passwordRegistration.html)

```
NCMB.user.requestPasswordReset({
  mailAddress: 'test@gmail.com'
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{"createDate":"2013-09-04T04:31:43.371Z"}

```

## [Request MailForUser Authenticaiton](http://mb.cloud.nifty.com/doc/current/rest/user/requestMailForUserAuthenticaiton.html)

```
NCMB.user.requestMailAddressUserEntry({
  mailAddress: 'test@gmail.com'
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result
```
{"createDate":"2013-09-04T04:31:43.371Z"}
```

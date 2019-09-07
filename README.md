# inside-out-promise
Produces extended Promises with attached chainable resolvers

## Install
```bash
npm add inside-out-promise
yarn add inside-out-promise
```

## Features
* Chainable `resolve` and `reject` methods
* Exposed promise state
* Configurable Promise implementation
* Typings for both worlds: Typescript and Flowtype

## Usage
```javascript
import {factory} from 'inside-out-promise'

const promise = factory()
promise.then((data) => {
  doSomething(data)
})


const data = await fetch({...})
promise.resolve(data)

// Or the same in OOP style
import {InsideOutPromise} from 'inside-out-promise'
const p = new InsideOutPromise()
```

#### Resolvers
```javascript
const promise = factory()

promise.resolve('foo')
promise.reject(new Error('bar'))
```

#### State
Promise [state](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise) field may take values: `Pending`, `Fulfilled` and `Rejected` 
```javascript:
const promise = factory()
promise.state // 'Pending'

promise.resolve()
promise.state // 'Fulfilled'
```

There're also 3 helper methods:
* `isPending()`
* `isRejected()`
* `isFulfilled()`

#### Chains
```javascript
factory().resolve('value').then(data => {
  // here's the value: data === 'value'
})

factory().reject(new Error()).catch(error => {
  // the error goes here
})
```

#### InsideOutPromise
```javascript
import InsideOutPromise from 'inside-out-promise'

const promise = new InsideOutPromise((resolve, reject) => {
  // Legacy handler flow is still works
  // ...
})

promise.resolve('foo')
promise.then(data => console.log(data)) // It's `foo`
```

#### Configuration
```javascript
import factory from 'inside-out-promise'
import * as Bluebird from 'bluebird'

factory.Promise = Bluebird // Native `Promise` by default
```

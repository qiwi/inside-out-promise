# inside-out-promise
Produces extended Promises with attached chainable resolvers

## Install
```bash
npm add inside-out-promise
yarn add inside-out-promise
```

## Features
* Exposed `resolve` and `reject` methods
* Chainable API
* Configurable Promise implementation
* `new` operator support
* Typings for both worlds: Typescript and Flowtype

## Usage
```javascript
import factory from 'inside-out-promise'

const promise = factory()
promise.then((data) => {
  doSomething(data)
})


const data = await fetch({...})
promise.resolve(data) 
```

#### Extentions
```javascript
const promise1 = factory()
const promise2 = factory()

promise1.resolve('foo')
promise2.reject(new Error('bar'))

```

#### Chains
```javascript
factory().resolve('value').then(data => {
  // here's the value: data === 'value'
})

factory().reject(new Error()).catch(error => {
  // the error goes here
})
```

#### new ExtendedPromise()
```javascript
import ExtendedPromise from 'inside-out-promise'

const promise = new ExtendedPromise((resolve, reject) => {
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


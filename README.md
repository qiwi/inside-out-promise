# inside-out-promise
Produces promises with chainable resolvers and observable state.

[![Build Status](https://travis-ci.com/qiwi/inside-out-promise.svg?branch=master)](https://travis-ci.com/qiwi/inside-out-promise)
[![David](https://img.shields.io/david/qiwi/inside-out-promise?label=deps)](https://david-dm.org/qiwi/inside-out-promise)
[![Maintainability](https://api.codeclimate.com/v1/badges/45b3792789211c6c8f09/maintainability)](https://codeclimate.com/github/qiwi/inside-out-promise/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/45b3792789211c6c8f09/test_coverage)](https://codeclimate.com/github/qiwi/inside-out-promise/test_coverage)
[![npm](https://img.shields.io/npm/v/inside-out-promise)](https://www.npmjs.com/package/inside-out-promise)

## Install
```bash
npm add inside-out-promise
yarn add inside-out-promise
```

## Key features
* Chainable `resolve` and `reject` methods
* Exposed promise `state` and `result` fields
* Configurable `Promise` implementation
* **TS** and **Flow** typings out of box

## Usage
```javascript
import {factory} from 'inside-out-promise'

const promise = factory() // produces a promise
promise.then((data) => {  // standard `thenable` iface
  doSomething(data)
})

const data = await fetch({...})
promise.resolve(data)     // internal resolver is exposed as public promise field
promise.result            // data ref
promise.value             // same data ref, result alias
promise.state             // 'Fulfilled'
promise.status            // status alias: 'Fulfilled'
promise.isPending()       // false
promise.isFulfilled()     // true
promise.isResolved()      // true

// Or the same in OOP style
import {InsideOutPromise} from 'inside-out-promise'
const p = new InsideOutPromise()
```
## API
#### Resolvers
Both `executor` args — `resolve` and `reject` — are available as chainable public methods:
```javascript
const promise = factory()

promise.resolve('foo')            // This's a promise
promise.reject(new Error('bar'))  // and this is too
```

#### Chains
```javascript
factory().resolve('value').then(data => {
  // here's the value: data === 'value'
})

factory().catch(error => {
  // the error goes here
}).reject(new Error())
```

You're able to combine steps in Java-like style: first build the "[CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html)" chain and `resolve` it after
```javascript
const p = new InsideOutPromise()
  .then(data => data.repeat(2))
    .then(data => data.toUpperCase())
      .then(data => data + 'bar')
        .resolve('foo')

const res = await p // 'FOOFOObar'
```

Each step return `InsideOutPromise` instance inherited from `Promise`, `Bluebird` (see [Configuration](#Configuration) for details), etc, so the `intanceof` check still works.
```javascript
const p1 = new InsideOutPromise()
const p2 = p1.then(data => data)

const v1 = await(p1)
const v2 = await(p2)

expect(p1).toBeInstanceOf(Promise)
expect(p2).toBeInstanceOf(Promise)
expect(p1).toBeInstanceOf(InsideOutPromise)
expect(p2).toBeInstanceOf(InsideOutPromise)
```

#### State
Promise [state](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise) field may take values: `Pending`, `Fulfilled` and `Rejected` 
```javascript
const promise = factory()
promise.state // 'Pending'

promise.resolve()
promise.state // 'Fulfilled'
```

There're also 3 helper methods:
* `isPending()`
* `isRejected()`
* `isFulfilled()`

#### InsideOutPromise
```javascript
import InsideOutPromise from 'inside-out-promise'

const promise = new InsideOutPromise((resolve, reject) => {
  // Legacy executor flow is still supported
  // ...
})

promise.resolve('foo')
promise.then(data => console.log(data)) // It's `foo`
```

## <a name="Configuration"></a>Configuration
```javascript
import factory from 'inside-out-promise'
import * as Bluebird from 'bluebird'

factory.Promise = Bluebird // Native `Promise` by default
```

## Refs
* [Fulfill vs resolve](https://stackoverflow.com/questions/35398365/js-promises-fulfill-vs-resolve)
* [States and fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
* [esimorp](https://github.com/WebReflection/esimorp)

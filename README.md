# inside-out-promise
Produces promises with chainable resolvers and observable state.

[![Build Status](https://travis-ci.com/qiwi/inside-out-promise.svg?branch=master)](https://travis-ci.com/qiwi/inside-out-promise)
[![npm (tag)](https://img.shields.io/npm/v/inside-out-promise/latest.svg)](https://www.npmjs.com/package/inside-out-promise)
[![dependencyStatus](https://img.shields.io/david/qiwi/inside-out-promise.svg?maxAge=3600)](https://david-dm.org/qiwi/inside-out-promise)
[![devDependencyStatus](https://img.shields.io/david/dev/qiwi/inside-out-promise.svg?maxAge=3600)](https://david-dm.org/qiwi/inside-out-promise)
[![Maintainability](https://api.codeclimate.com/v1/badges/45b3792789211c6c8f09/maintainability)](https://codeclimate.com/github/qiwi/inside-out-promise/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/45b3792789211c6c8f09/test_coverage)](https://codeclimate.com/github/qiwi/inside-out-promise/test_coverage)
[![CodeStyle](https://img.shields.io/badge/code%20style-tslint--config--qiwi-brightgreen.svg)](https://github.com/qiwi/tslint-config-qiwi)

## Install
```bash
npm add inside-out-promise
yarn add inside-out-promise
```

## Features
* Chainable `resolve` and `reject` methods
* Exposed promise `state` and `result`
* Configurable Promise implementation
* Typings for both worlds: Typescript and Flowtype

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
Both `executor` args — `resolve` and `reject` — are available as public methods:
```javascript
const promise = factory()

promise.resolve('foo')
promise.reject(new Error('bar'))
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

## Configuration
```javascript
import factory from 'inside-out-promise'
import * as Bluebird from 'bluebird'

factory.Promise = Bluebird // Native `Promise` by default
```

## Refs
* [Fulfill vs resolve](https://stackoverflow.com/questions/35398365/js-promises-fulfill-vs-resolve)
* [States and fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
* [esimorp](https://github.com/WebReflection/esimorp)

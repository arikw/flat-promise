# Flat Promise

Create a fresh new `Promise` with exposed `resolve()` & `reject()` callbacks available outside of its executor function

# Installation

```sh
npm install flat-promise
```

# Usage

```js
const flatPromise = require("flat-promise");
```

# Usage Examples

## The "safe" way ##
`flatPromise()` will return an object containing a new `Promise` along with its `resolve()` and `reject()` methods.

#### Creating an instance ####

```js
const { resolve, reject, promise } = flatPromise();
```

It's recommended to avoid giving the control of the promise (the resolution methods) beyond the outer scope of where the promise was created - don't return `resolve()` or `reject()` methods nor keep a reference to the methods in an outer scope.

#### Usage example ####
```js
function doAsyncWork() {

  // Get your promise and resolution methods
  const { promise, resolve, reject } = flatPromise();

  // Do something amazing...
  setTimeout(() => {
      resolve('done!');
  }, 500);

  // Pass your promise to the world
  return promise;

}

const result = await doAsyncWork();
console.log(result);
```

## The "unsafe" way ##

`flatPromise.withControl()` will return a promise with the resolution methods inside it - meaning passing the promise is also passing the `resolve()` and `reject()` methods, the control, along with it.

The `then()`, `catch()` & `finally()` methods also return a promise containing `resolve()` and `reject()` methods.

#### Creating an instance ####

```js
const promise = flatPromise.withControl();
```
*- or -*
```js
const { promise, resolve, reject } = flatPromise.withControl();
```
#### Usage example ####
```js
function doAsyncWork() {

  // Get your promise and resolution methods
  const promise = flatPromise.withControl().then(() => "cool!");

  // Do something amazing...
  setTimeout(() => {
      promise.resolve();
  }, 500);

  // Pass your promise (and control!) to the world
  return promise;

}

const result = await doAsyncWork();
console.log(result);
```

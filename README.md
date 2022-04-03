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

# Examples

## Basic usage ##
`flatPromise()` will return an object containing a new `Promise` and its `resolve()` and `reject()` methods.

### Creating an instance ###

```js
const { resolve, reject, promise } = flatPromise();
```

It's recommended to avoid giving the control of the promise (the resolution methods) beyond the outer scope of where the promise was created - don't return `resolve()` or `reject()` methods nor keep a reference to the methods in an outer scope.

### Usage example ###
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

## Alternative usage ##

`flatPromise.withControl()` will return a promise with its resolution methods exposed inside it. It means passing around the promise is also passing around its `resolve()` and `reject()` methods.

The `then()`, `catch()` & `finally()` methods also return a promise containing `resolve()` and `reject()` methods.

***Notice: This usage makes the promise state harder to maintain and to control.***

### Creating an instance ###

```js
const promise = flatPromise.withControl();
```
*- or -*
```js
const { promise, resolve, reject } = flatPromise.withControl();
```
### Usage example ###
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

# Caveat

This library basically brings a way to fulfill or reject a promise outside the promise chain. It means that errors thrown in the process of promise settling will not automatically reject the promise and should be catched explicitly!
Please see [this great explanation](https://stackoverflow.com/questions/28687566/#28692824) for more information about throw safety.

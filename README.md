# ConcordAPI
ConcordAPI is intended to be a simple way of interacting with the Concord Services and it's REST API via Node.js.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

**WARNING:** This module is in very early development, and has a few bugs which are known by me, you are free to create a Pull Request if any issues/bugs are fixed, please do not rely on this module solely.


## Getting Started

Install the Concord-API NPM Package with:
```
npm i concordapi
```
And require the module in your Node.js application with:
```js
var concord = require("concordapi")
```


### Setting up Concord-API

The Concord API, at current time, has to have an instantiation period. This is a temporary fix to a bug which i will learn to fix soon!


To get the API ready for usage, instantiate the API and Caching with:
```js
concord.connect() //Console should print "CXDx Prices cached... Services are Ready"
```

### Reading Concord Exchange (CXDx) Prices

To check a coin's price in CXD use:
```js
concord.price(string)
```

For example, using:
```js
var coin = "IC"
setInterval(checkPrice, 5000)

function checkPrice () {
	console.log('1 '+coin+' is '+concord.price(coin)+' CXD')
}
```
Would log the price of IC (Ignition Coin) every 5 seconds, due to the way caching works here, each result is one 'API-Tick' older than the requested latest price.

### Reading Concord Social Platform (CSP) Profiles
```
Coming soon, Module bug mentioned before makes this function impossible to create.
```

## Full Examples
  Examples in this section can be freely copy/pasted into your code and modified to your choosing.
  ```js
  var concord = require("concordapi")
  concord.connect() //Instantiate Concord Library and load cache.

  var coin = "IC" //Coin listed on CXDx to check price of, in CXD.
  setInterval(checkPrice, 5000) //Check coin-price every 5 seconds

  function checkPrice () {
  	console.log('1 '+coin+' is '+concord.price(coin)+' CXD') // Prints the price of the CXDx Coin
  }
```

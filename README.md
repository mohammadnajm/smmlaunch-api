# smmlaunch-api

Node.js wrapper for [smmlaunch.com API v2](https://smmlaunch.com).

## Installation

``` bash
npm install smmlaunch-api
```

## Usage

``` js
const SmmlaunchApi = require("smmlaunch-api");

const api = new SmmlaunchApi("YOUR_API_KEY", "ENDPOINT_URL");

// get balance
api.balance().then(console.log);

// get services
api.services().then(console.log);

// add order
api.order({
  service: 1,
  link: "http://example.com",
  quantity: 100,
}).then(console.log);

// check order status
api.status(12345).then(console.log);
```

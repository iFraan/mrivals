<div align="center">
    <h1>mrivals</h1>
    <a href="https://www.codefactor.io/repository/github/ifraan/mrivals"><img src="https://www.codefactor.io/repository/github/ifraan/mrivals/badge"    alt="CodeFactor" /></a>
    <a href="https://www.npmjs.com/package/mrivals"><img src="https://badgen.net/npm/v/mrivals?color=blue" alt="NPM-Version"/></a>
    <a href="https://www.npmjs.com/package/mrivals"><img src="https://badgen.net/npm/dt/mrivals?color=blue" alt="NPM-Downloads"/></a>
    <a href="https://github.com/iFraan/mrivals"><img src="https://badgen.net/github/stars/iFraan/mrivals?color=yellow" alt="Github Stars"/></a>
    <a href="https://github.com/iFraan/mrivals/issues"><img src="https://badgen.net/github/open-issues/iFraan/mrivals?color=green" alt="Issues"/></a>
    <h2>This a wrapper/scrapper of the TRNetwork site with <b>Marvel Rivals</b> stats.</h2>
    <h3>There are no API keys required.</h3>
</div>

## Instalation

```shell
npm i mrivals
```

## Usage:

**Note:** This module can use many strategies to fetch data: `fetch`, `curl` and `flaresolverr`

- For browser envoriments:
  - Default `fetch` should be ok, can use a `flaresolverr` if available
- For server enviroments:
  - You can try your luck with `fetch` _(node v16+)_, switch to `curl` if it fails
  - `flaresolverr` is recommended _(the default docker image is ok)_


You can pass additional options:

| Option          | Type    | Description                          | Default     |
| --------------- | ------- | ------------------------------------ | ----------- |
| useCurl         | boolean | Whether to use curl instead of fetch | false       |
| flaresolverrUrl | string  | The url of the flaresolverr instance | `undefined` |


```js
await API.fetchUser(username, { 
  flaresolverrUrl: 'https://some.flaresolverr.domain:8191', // will use flaresolverr instance 
  useCurl: true, // will use curl instead of fetch (ommited when flaresolverrUrl is provided)
});
```

## Example

There is only one static function that takes an username.

```js
// this returns an API instance with the data already fetched
await API.fetchUser(username); // user#tag
```

> You must call **API.fetchUser** before using any other method.

| Methods     | Description         |
| ----------- | ------------------- |
| info        | user and mmr info   |
| overview    | overview stats      |
| heroes      | heroes stats        |
| roles       | roles stats         |
| peakRank    | peak rank           |
| raw         | return raw response |

## Example code

_Feel free to use my riot username for testing_

```js
const { API } = require('mrivals');

try {
  const user = await API.fetchUser('ifraan');

  console.log('User:', user.info());
  console.log('Overview:', user.overview());
  console.log('Heroes:', user.heroes());
  console.log('Roles:', user.roles());
  console.log('Peak MMR:', user.peakRank());
  console.log('Raw:', user.raw());
} catch (e) {
  console.log(e);
  /* Error: We could not find the player [player]. */
}
```

# Disclaimer

This project is fully for educational purposes and if you want to use the marvel rivals api in a production/commertial enviroment you should ask or email the guys at [TRNetwork](https://tracker.gg/).

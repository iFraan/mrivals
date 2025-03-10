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

> This module uses `flaresolverr` to fetch data
> You need to have an `flaresolverr` instance to use this library, using the default docker image is fine.

### To install use:

```shell
npm i mrivals
```

### Set enviroments variables

> This programs defaults this env to http://localhost:8191

You have to set the `FLARESOLVERR_URL` enviroment variable to the url of your `flaresolverr` instance.

Also you can pass it as an options of `API.fetchUser`

```js
await API.fetchUser(username, { flaresolverrUrl: 'https://some.flaresolverr.domain:8191' });
```

## Usage

There is only one static function that takes an username.

```js
/* returns an API class instance with the data already fetched */
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

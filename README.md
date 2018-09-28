<p align="center">
  <a href="https://www.moneybutton.com">
    <img alt="React Money Button" src="https://www.moneybutton.com/static/img/MB-logo-1.svg" width="250">
  </a>

  <p align="center">
    React Money Button is a library for easily integrating <a href="https://www.moneybutton.com">Money Button</a> into your app.
  </p>
</p>

---

[![Version][version-svg]][package-url] [![Build Status][ci-svg]][ci-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

React Money Button is a React library that lets you integrate [Money Button][money-button-website]’s payment system into your app with only a few lines of code.

## Installation

React Money Button is available on the npm registry. You can install it both via yarn and npm.

```sh
yarn add @moneybutton/react-money-button
# or
npm install @moneybutton/react-money-button
```

## Getting started

Using React Money Button is as simple as adding this component to your app:

```javascript

import React, { Component } from 'react'
import MoneyButton from 'react-money-button'

class MyApp extends Component {
  render() {
    return <MoneyButton
      to="<your-bitcoin-address-here>"
      amount="1"
      currency="USD"
    />
  }
}
```

To learn more about the library, check out the [docs](https://docs.moneybutton.com/docs/react-money-button.html).

## License

React Money Button is [MIT licensed](LICENSE).

<!-- Links -->

[website]: https://www.moneybutton.com
[money-button-website]: https://www.moneybutton.com
[ci-svg]: https://circleci.com/gh/moneybutton/react-money-button.svg?style=svg
[ci-url]: https://circleci.com/gh/moneybutton/react-money-button
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/react-money-button.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=react-money-button
[version-svg]: https://img.shields.io/npm/v/react-money-button.svg?style=flat-square
[package-url]: https://yarnpkg.com/en/package/react-money-button

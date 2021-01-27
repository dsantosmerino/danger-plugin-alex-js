# danger-plugin-alex-js
![build](https://github.com/dsantosmerino/danger-plugin-alex-js/workflows/NodeJS/badge.svg)
[![npm version](https://badge.fury.io/js/danger-plugin-alex.svg)](https://badge.fury.io/js/danger-plugin-alex)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Catch insensitive, inconsiderate writing with [alex](https://alexjs.com/) and [Danger JS](https://danger.systems/js).

## Usage

Install:

```sh
yarn add danger-plugin-alex --dev
```

At a glance:

```js
// dangerfile.js
import alex from 'danger-plugin-alex'

alex()
```

Output:

> #### Issues for `README.md`:
> | Line | Issue |
> | ---- | ---- |
> 3 | `master` / `slaves` may be insensitive, use `primary` / `replica` instead
> 51 | Don’t use `dammit`, it’s profane
> 89 | `he` may be insensitive, use `they`, `it` instead

## Changelog

See the GitHub [release history](https://github.com/dsantosmerino/danger-plugin-alex/releases).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

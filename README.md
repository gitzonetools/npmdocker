# @gitzone/npmdocker
develop npm modules cross platform with docker

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@gitzone/npmdocker)
* [gitlab.com (source)](https://gitlab.com/gitzone/npmdocker)
* [github.com (source mirror)](https://github.com/gitzone/npmdocker)
* [docs (typedoc)](https://gitzone.gitlab.io/npmdocker/)

## Status for master
[![build status](https://gitlab.com/gitzone/npmdocker/badges/master/build.svg)](https://gitlab.com/gitzone/npmdocker/commits/master)
[![coverage report](https://gitlab.com/gitzone/npmdocker/badges/master/coverage.svg)](https://gitlab.com/gitzone/npmdocker/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@gitzone/npmdocker.svg)](https://www.npmjs.com/package/@gitzone/npmdocker)
[![Known Vulnerabilities](https://snyk.io/test/npm/@gitzone/npmdocker/badge.svg)](https://snyk.io/test/npm/@gitzone/npmdocker)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

### Why does this package exist?

Sometimes you want a clean and fresh linux environment everytime you test your package.
Usually this is the default i CI, but locally behaviour tends to defer.

### Where does it work

The npmdocker package works in everywhere where the docker cli is available. e.g.:

- docker toolbox
- native docker application
- docker in docker
- mounted docker.sock

### How do I use it?

create a npmextra.json in the project's root directory

```json
{
  "npmdocker": {
    "baseImage": "hosttoday/ht-docker-node:npmts",
    "command": "npmci test stable",
    "dockerSock": false
  }
}
```

| option      | description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| baseImage   | the base image that is the context for your project                                   |
| command     | the cli command to run within the the project's directory inside the docker container |
| dockersSock | wether or not the testcontainer will have access to the docker.sock of the host       |

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://gitzone.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)

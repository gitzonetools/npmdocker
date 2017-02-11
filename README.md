# npmdocker
develop npm modules cross platform with docker

## Availabililty
[![npm](https://gitzone.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/npmdocker)
[![git](https://gitzone.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/gitzone/npmdocker)
[![git](https://gitzone.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/gitzone/npmdocker)
[![docs](https://gitzone.gitlab.io/assets/repo-button-docs.svg)](https://gitzone.gitlab.io/npmdocker/)

## Status for master
[![build status](https://GitLab.com/gitzone/npmdocker/badges/master/build.svg)](https://GitLab.com/gitzone/npmdocker/commits/master)
[![coverage report](https://GitLab.com/gitzone/npmdocker/badges/master/coverage.svg)](https://GitLab.com/gitzone/npmdocker/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/npmdocker.svg)](https://www.npmjs.com/package/npmdocker)
[![Dependency Status](https://david-dm.org/gitzonetools/npmdocker.svg)](https://david-dm.org/gitzonetools/npmdocker)
[![bitHound Dependencies](https://www.bithound.io/github/gitzonetools/npmdocker/badges/dependencies.svg)](https://www.bithound.io/github/gitzonetools/npmdocker/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/gitzonetools/npmdocker/badges/code.svg)](https://www.bithound.io/github/gitzonetools/npmdocker)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
Use TypeScript for best in class instellisense.

### Why does this package exist?
Sometimes you want a clean and fresh linux environment everytime you test your package.
Usually this is the default i CI, but locally behaviour tends to defer.

### Where does it work
The npmdocker package works in everywhere where the docker cli is available. e.g.:

  * docker toolbox
  * native docker application
  * docker in docker
  * mounted docker.sock

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

option | description
--- | ---
baseImage | the base image that is the context for your project
command | the cli command to run within the the project's directory inside the docker container
dockersSock | wether or not the testcontainer will have access to the docker.sock of the host

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)

[![npm](https://gitzone.gitlab.io/assets/repo-footer.svg)](https://git.zone)

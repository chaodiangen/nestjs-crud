<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### 项目概述
本项目使用 NestJS 框架创建，主要用于管理 Web 应用程序。该项目包括用户、角色、菜单和日志的增删改查功能，使用 MySQL 数据库存储数据，Node.js 版本为 v16。

## 功能模块
### 用户模块
该模块主要负责管理用户数据，包括用户的增删改查功能。具体功能如下:

用户注册：用户可以注册新账号。
用户登录：用户可以登录到应用程序。
用户信息：可以查看用户信息，包括用户名、密码、邮箱、电话号码等。
用户编辑：可以编辑用户信息，包括用户名、密码、邮箱、电话号码等。
用户删除：可以删除用户数据。
### 角色模块
该模块主要负责管理角色数据，包括角色的增删改查功能。具体功能如下:

角色添加：可以添加新的角色。
角色删除：可以删除角色数据。
角色修改：可以修改角色信息，包括名称、描述、权限等。
### 菜单模块
该模块主要负责管理菜单数据，包括菜单的增删改查功能。具体功能如下:

菜单添加：可以添加新菜单。
菜单删除：可以删除菜单数据。
菜单修改：可以修改菜单信息，包括名称、图标、路径等。
### 日志模块
该模块主要负责管理日志数据，包括日志的增删改查功能。具体功能如下:

日志添加：可以添加新日志。
日志删除：可以删除日志数据。
日志修改：可以修改日志信息，包括日期、内容、用户等信息。
### 数据库设计
在 `migrations/init.sql`
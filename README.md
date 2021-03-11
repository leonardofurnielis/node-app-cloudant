# node-sample-cloudant

[![Build Status](https://travis-ci.org/leonardofurnielis/node-sample-cloudant.svg?branch=master)](https://travis-ci.org/leonardofurnielis/node-sample-cloudant)

## Table of Contents

- [Local](#local)
- [Docker](#docker)

## Local

To run this code in your computer execute the following commands into project root directory

```bash
$ npm install
$ npm start
```

## Docker

To run this code using Docker container execute the following commands into project root directory

```bash
$ docker build -t node-sample-cloudant .
$ docker run -p 8080:3000 -d node-sample-cloudant
```

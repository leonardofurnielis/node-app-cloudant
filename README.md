# node-cloudant

![workflow](https://github.com/leonardofurnielis/node-cloudant/actions/workflows/build-test.yml/badge.svg)
[![codecov](https://codecov.io/gh/leonardofurnielis/node-cloudant/branch/master/graph/badge.svg?token=5LTEJCG91W)](https://codecov.io/gh/leonardofurnielis/node-cloudant)

## Table of Contents

- Developing locally
  - [Native runtime](#native-runtime)
  - [Containerized](#containerized)

## Native runtime 

To run this code in your computer execute the following commands into project root directory

```bash
sh generating-rsa-key.sh

npm install
npm start
```

## Containerized

To run this code using Podman container execute the following commands into project root directory

```bash
sh generating-rsa-key.sh
podman build -t node-cloudant .
podman run -p 8080:3000 -d node-cloudant
```

## 版本要求

- 7.1 - React 16.8.3
- !7.0 - React 16.0
- 6.x - React 16.0

### muji版本
- 批售版本 v6.0.12 react:v16.4.0
```json
{
  "name": "@souche-f2e/muji",
  "version": "0.2.6",
  "description": "",
  "main": "lib/index.js",
  "module": "lib/index.js",
  "types": "src/typings/index.d.ts",
  "files": [
    "src",
    "lib"
  ],
  "author": "souche-f2e",
  "scripts": {
    "dev": "rimraf lib && tsc -w",
    "build": "rimraf lib && tsc",
    "prepare": "npm run build",
    "postinstall": "PATH=$PATH:./node_modules/.bin/ node -e \"try{require('child_process').execSync('npm-statistics')}catch(err){};require('process').exit(0);\""
  },
  "dependencies": {
    "@souche-f2e/muji-router": "^0.2.6",
    "@souche-f2e/muji-store": "^0.2.6",
    "@souche-f2e/npm-statistics": "latest",
    "axios": "^0.18.0",
    "deepmerge": "^3.2.0",
    "lodash.defaultsdeep": "^4.6.0",
    "react": "^16.4.0",
    "react-dom": "^16.4.0",
    "react-redux": "^6.0.0",
    "redux": "^4.0.0",
    "tslib": "^1.9.3"
  },
  "devDependencies": {
    "@types/enzyme": "^3.9.1",
    "@types/hoist-non-react-statics": "^3.3.1",
    "@types/invariant": "^2.2.29",
    "@types/jest": "^24.0.11",
    "@types/lodash": "^4.14.123",
    "@types/lodash.defaultsdeep": "^4.6.4",
    "@types/react": "^16.8.8",
    "@types/react-dom": "^16.8.3",
    "@types/react-redux": "^6.0.12",
    "@types/react-test-renderer": "^16.8.1",
    "@types/webpack-env": "^1.13.9",
    "enzyme": "^3.9.0",
    "enzyme-adapter-react-16": "^1.12.1",
    "enzyme-to-json": "^3.3.5",
    "jest": "^24.5.0",
    "react-test-renderer": "^16.8.5",
    "rimraf": "^2.6.2",
    "ts-jest": ">=24.0.0",
    "typescript": "^3.3.4000"
  },
  "gitHead": "c5ecc3db1d9a4d703929a4e4c6dcd79424a9e9d5"
}
```
- 最新版 v7.0.0 react:v16.4.0
```json
{
  "name": "@souche-f2e/muji",
  "version": "0.4.23",
  "description": "",
  "main": "lib/index.js",
  "module": "lib/index.js",
  "types": "src/typings/index.d.ts",
  "files": [
    "src",
    "lib"
  ],
  "author": "souche-f2e",
  "scripts": {
    "dev": "rimraf lib && tsc -w",
    "build": "rimraf lib && tsc --build tsconfig.json",
    "test": "jest",
    "prepare": "yarn run build",
    "postinstall": "PATH=$PATH:./node_modules/.bin/ node -e \"try{require('child_process').execSync('npm-statistics')}catch(err){};require('process').exit(0);\""
  },
  "dependencies": {
    "@souche-f2e/npm-statistics": "latest",
    "@souche-f2e/path-to-regexp": "^1.7.0",
    "axios": "^0.18.0",
    "classnames": "^2.2.6",
    "deepmerge": "^3.2.0",
    "immer": "^3.1.3",
    "invariant": "^2.2.4",
    "lodash.defaultsdeep": "^4.6.0",
    "react": "^16.4.0",
    "react-dom": "^16.4.0",
    "react-redux": "^7.0.0",
    "redux": "^4.0.0",
    "tslib": "^1.9.3",
    "warning": "^4.0.3"
  },
  "devDependencies": {
    "@types/classnames": "^2.2.8",
    "@types/enzyme": "^3.9.1",
    "@types/hoist-non-react-statics": "^3.3.1",
    "@types/invariant": "^2.2.29",
    "@types/jest": "^24.0.11",
    "@types/lodash": "^4.14.123",
    "@types/lodash.defaultsdeep": "^4.6.4",
    "@types/react": "^16.8.8",
    "@types/react-dom": "^16.8.3",
    "@types/react-redux": "^7.0.0",
    "@types/react-test-renderer": "^16.8.1",
    "@types/warning": "^3.0.0",
    "@types/webpack-env": "^1.13.9",
    "enzyme": "^3.9.0",
    "enzyme-adapter-react-16": "^1.12.1",
    "enzyme-to-json": "^3.3.5",
    "jest": "^24.5.0",
    "react-test-renderer": "^16.8.5",
    "rimraf": "^3.0.0",
    "ts-jest": ">=24.0.0",
    "typescript": "^3.6.2"
  },
  "gitHead": "69b87fb276306b96948c8a45a9ebbaff652498c6"
}
```

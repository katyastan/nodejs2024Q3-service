# Home Library Service

## Description
Home Library Service is a Node.js RESTful API built with NestJS. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone {repository URL}
```

## Installing NPM modules

```bash
npm install
```

## Port
Application is running on port by default: http://localhost:4000

You can change the port. Open the `.env` file and set the desired port number:
```bash
PORT=4000
```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

### Auto-fix and format
Ensure code quality and consistency by running:

```bash
npm run lint
```

```bash
npm run format
```

## API Documentation

The API documentation is generated using OpenAPI (Swagger) and is available at:

```
http://localhost:4000/doc
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---
to: <%= name %>/functions/package.json
---
{
  "name": "<%= name.toLowerCase() %>-functions",
  "scripts": {
    "lint": "eslint --ext .js,.ts .",
    "build": "tsc --build",
    "serve": "npm run build && firebase emulators:start --only functions",
    "shell": "npm run build && firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log",
    "emulate": "yarn build && firebase emulators:start --only functions,database"
  },
  "engines": {
    "node": "14"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^9.8.0",
    "firebase-functions": "^3.14.1"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^3.9.1",
    "@typescript-eslint/parser": "^3.8.0",
    "eslint": "^7.6.0",
    "eslint-config-google": "^0.14.0",
    "eslint-plugin-import": "^2.22.0",
    "firebase-functions-test": "^0.2.0",
    "typescript": "^3.8.0"
  },
  "private": true
}

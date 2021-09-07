# ShipEngine Firebase Extensions

## Development

```zsh
$ yarn install # install dependencies
$ yarn run firebase login # login to firebase
$ yarn run firebase --open-sesame extdev # to enable access to pre-release extension commands
```

Create a .env.development file in the extension directory that contains the Cloud Functions, and include values for any params the extension needs for installation (including the ShipEngine API key).
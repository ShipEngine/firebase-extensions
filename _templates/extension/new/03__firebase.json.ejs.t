---
to: <%= name %>/firebase.json
---
{
  "database": {
    "rules": "database.rules.json"
  },
  "functions": {
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint",
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ]
  },
  "emulators": {
    "functions": {
      "port": 5001
    },
    "database": {
      "port": 9000
    },
    "ui": {
      "enabled": true
    }
  }
}

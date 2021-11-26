# Getting Started

```
npm install
expo start
```

## Building apk

### For managed workflow(Expo)

Run the following command

```
expo build:android
```

### For bare workflow

You'll need eas-cli. Docs https://docs.expo.dev/build-reference/apk/

Run the following command

```
eas build:configure
```

It will create eas.json file. In this file make some changes as below.

```
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  }
}
```

Remember that you can name the profile whatever you like; we named the profile "preview", but you could call it "local" or "simulator", whatever makes most sense for you.

Now run this last step, it will create downloadable apk and link for that will be there in terminal.

```
eas build -p android --profile preview \\here "preview" is name we used while editing eas.json file
```

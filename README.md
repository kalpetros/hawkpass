![](logo.png)

[![Build Status](https://travis-ci.org/kalpetros/hawkpass-desktop.svg?branch=master)](https://travis-ci.org/kalpetros/hawkpass-desktop)

A simple cross-platform cryptographically secure random number generator based on entropy created by your mouse movements that generates easy to remember passwords based on the [Diceware](http://world.std.com/~reinhold/diceware.html) list.

Hawkpass Desktop is the desktop version of the web app [Hawkpass](http://www.petroskal.com/hawkpass), and it is built on [Electron](https://github.com/atom/electron).

![](hawkpass.png)

## Testing locally

To run the app locally you'll need to install *electron-prebuilt* with npm.

Install *electron-prebuilt* globally:
```
sudo npm install electron-prebuilt -g
```
or locally:
```
npm install electron-prebuilt
```
Once *electron-prebuilt* is installed you will only need to run the following in the app's source directory:
```
// If you installed it globally
electron .
// If you installed it locally
./node_modules/.bin/electron .
```

## Packaging Hawkpass

Packaging Hawkpass for your platform can be done using [electron-packager](https://github.com/maxogden/electron-packager).

Type the following to install *electron-packager*
```
npm install --save-dev electron-packager
```
Generally the command to package an application is:
```
electron-packager <location> <name> <platform> <architecture> <version> <options>
```
| <> | Description  |
| --- | --- |
| location | location of your project  |
| name | name of your project |
| platform | for which platform you want to build. Use `--all` to build for Windows, Mac and Linux |
| architecture | for which architecture you want to build. `--x86`, `--x64`, `--all` for both |
| version | which electron version to use `--version` |
| options | output location `--out`, icon `--icon` |

An example would be:
```
electron-packager ~/Projects/hawkpass-desktop Hawkpass --all --version=0.36.8 --out=~/Projects --icon=~/Project/icon.icns
```
To simplify the process we can create the following script inside *package.json*
```
"scripts": {
  "start": "electron .",
  "package": "electron-packager ./ Hawkpass --all --out ~/Projects/Hawkpass --version 0.36.8 --overwrite"
}
```
and then run the command below to start packaging:
```
npm run-script package
```
## Licence

[MIT](https://github.com/kalpetros/hawkpass-desktop/blob/master/LICENSE)

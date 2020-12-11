<p align="center">
  <img height="200px" src="icon.png"/>
</p>
<p align="center">
  <img src="https://img.shields.io/travis/com/kalpetros/hawkpass"/>
  <img src="https://img.shields.io/github/license/kalpetros/hawkpass"/>
  <img src="https://img.shields.io/snyk/vulnerabilities/github/kalpetros/hawkpass"/>
  <img src="https://img.shields.io/github/v/release/kalpetros/hawkpass?include_prereleases"/>
  <img src="https://img.shields.io/github/downloads/kalpetros/hawkpass/total"/>
</p>
<p align="center">
A simple cross-platform cryptographically secure (SHA-256) random number generator that uses entropy collected from your mouse movements to generate <b>easy to remember passwords</b> based on the <a href="http://world.std.com/~reinhold/diceware.html">Diceware</a> list.
</p>
<p align="center">
  <img src="hawkpass.png"/>
</p>

## Live version

For a live version visit https://kalpetros.github.io/hawkpass

## Download

The latest version of Hawkpass can be downloaded from the [releases](https://github.com/kalpetros/hawkpass-desktop/releases) page.

## Testing locally

First install the necessary dependencies by running:

```
$ npm install
```

To run the app in your browser type:

```
$ npm run develop
```

## Packaging Hawkpass

Before packaging you need to run a production build by typing:

```
$ npm run build
```

Then packaging Hawkpass for your platform can be done using [Electron Forge](https://www.electronforge.io/).

To generate platform specific distributables type:

```
$ npm run make
```

Check the **out** folder for the created package.

## FAQ

### Why use passphrases?

> The word "passphrase" is used to convey the idea that a password, which is a single word, is far too short to protect you and that using a longer phrase is much better. The increased length can allow for a greater number of possibilities overall, even if you use a passphrase made of random words to help you remember it. Passphrases made of randomly-chosen words can be both easy to remember and hard for someone else to guess, which is what we want out of a passphrase. While the EFF random number generators are not casino-grade dice, we believe that they are sufficiently random for these purposes. [(1)][1]

> Computers are now fast enough to quickly guess passwords shorter than ten or so characters - and sometimes quite a few more. That means short passwords of any kind, even totally random ones like nQ\m=8\*x or !s7e&nUY or gaG5^bG, may be too weak, especially for settings where an attacker is able to quickly try an unlimited number of guesses. This is not necessarily true for an online account, where the speed and quantity of guesses will be limited, but it could be true in other cases (for instance, if someone gets ahold of your device and is trying to crack its encryption password). [(1)][1]

### When to use a passphrase?

> Your passphrase is especially suitable when directly used to encrypt information, like for full-disk encryption on your laptop or mobile device. The large number of possibilities makes it much harder for someone to crack even if they get ahold of your device and use encryption-cracking hardware. Other great uses are the passphrase for an encryption key (like your PGP or SSH key), or, especially, for unlocking a password safe or password manager application. [(1)][1]

> Your passphrase should only be used for a single purpose, and especially should not be used for more than one online account. Sometimes password databases or websites get compromised. If you reuse a passphrase and it ends up being leaked in a data breach or otherwise discovered, it can be used to try to access your other accounts. [(1)][1]

## Contributing

Contributions are welcome! To get started please read the [contribution guidelines](https://github.com/kalpetros/hawkpass-desktop/blob/master/CONTRIBUTING.md).

Report any issues or feature requests you have [here](https://github.com/kalpetros/hawkpass-desktop/issues).

## Licence

[MIT](https://github.com/kalpetros/hawkpass-desktop/blob/master/LICENSE)

[1]: https://www.eff.org/dice

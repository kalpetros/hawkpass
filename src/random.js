/**
 * Class for secure random number generation.
 *
 * @example
 * random.addEntropy(anything) to add some randomness.
 * random.random(max) or random.choice(array) to get some.
 */
import { words } from './wordlist';
import { commaSeparateNumber } from './utils';

export function Random() {
  let buffer = '';
  let local_storage =
    typeof window.localStorage != 'undefined' ? localStorage : {};

  function seedOracle(buffer) {
    return CryptoJS.SHA256(buffer + 'seed').toString();
  }

  function outputOracle(buffer) {
    return CryptoJS.SHA256(buffer + 'output').toString();
  }

  /**
   * Core random generation function.
   *
   * Returns a cryptographically secure pseudo-random 256-bit hexadecimal
   * string.  Though, usually just
   * '1ec1c26b50d5d3c58d9583181af8076655fe00756bf7285940ba3670f99fcba0'.
   */
  function getRandomBuffer() {
    const output = outputOracle(buffer);
    buffer = seedOracle(buffer);
    updateLocalStorage();
    return output;
  }

  function random_2(bits) {
    const output = getRandomBuffer();

    if (output.length * 4 < bits) {
      throw new Error('not enough bits in buffer');
    }

    const hex = output.slice(0, Math.ceil(bits / 4));

    return parseInt(hex, 16);
  }

  function updateLocalStorage() {
    local_storage.random_seed = outputOracle(buffer);
    // You must rehash the buffer after (or before) outputting the hash.
    // Otherwise you may get the same result again and again.
    buffer = seedOracle(buffer);
  }

  const addReplacement = (replacements, string) => {
    const replaceable = new RegExp('[' + Object.keys(replacements) + ']', 'g');
    let chars = string.split('');
    let i;

    do {
      i = this.random(chars.length);
    } while (!chars[i].match(replaceable));

    chars[i] = replacements[chars[i]];

    return {
      password: chars.join(''),
      entropy: Math.log(string.match(replaceable).length) / Math.log(2),
    };
  };

  const sentencePassword = (template, options) => {
    let entropy = 0;
    let sentence = [];
    let haystack;
    let token;
    let password;
    let i;

    for (i = 0; i < template.length; i++) {
      token = template[i];
      haystack = words[token];

      if (!haystack) {
        throw new Error('Unknown token "' + token + '"');
      }

      sentence.push(this.choice(haystack));
      entropy += Math.log(haystack.length) / Math.log(2);
    }

    if (!options.useSpaces) {
      // Capitalize the letters if we don't use spaces
      for (i = 0; i < sentence.length; i++) {
        token = sentence[i];
        token = token.substr(0, 1).toUpperCase() + token.substr(1);
        sentence[i] = token;
      }

      password = sentence.join('');
    } else {
      password = sentence.join(' ');
    }

    let ret = {
      password: password,
      entropy: entropy,
    };

    if (options.useNumbers) {
      const new_password = addReplacement(
        {
          a: '4',
          e: '3',
          i: '1',
          o: '0',
          q: '9',
          s: '5',
          t: '7',
          z: '2',
        },
        ret.password
      );
      ret.password = new_password.password;
      ret.entropy += new_password.entropy;
    }

    if (options.useSymbols) {
      const new_password = addReplacement(
        {
          a: '@',
          b: '|3',
          c: '(',
          h: '|-|',
          i: '!',
          k: '|<',
          l: '|',
          t: '+',
          v: '\\/',
          s: '$',
          x: '%',
        },
        ret.password
      );
      ret.password = new_password.password;
      ret.entropy += new_password.entropy;
    }

    return ret;
  };

  // function updateLocalStorageTimeout() {
  //   updateLocalStorage();
  //   setTimeout(updateLocalStorageTimeout, 5000);
  // }

  // setTimeout(updateLocalStorageTimeout, 5000);

  /**
   * `random` returns n such that `0 <= n < max`
   * `max` must be greater than 0.
   */
  this.random = function (max) {
    if (max < 1) {
      throw new Error('`random()` expects a max greater than 0.');
    } else if (max == 1) {
      return 0;
    }

    const bits = Math.ceil(Math.log(max) / Math.log(2));
    let n;

    do {
      n = random_2(bits);
    } while (n >= max);

    return n;
  };

  /**
   * Returns a random element from an array.
   */
  this.choice = function (arr) {
    if (arr.length == 0) {
      return;
    }

    const i = this.random(arr.length);

    return arr[i];
  };

  /**
   * Add some entropy to the internal buffer.
   */
  this.addEntropy = function (entropy) {
    buffer = seedOracle(buffer + entropy);
  };

  this.generate = options => {
    let template = ['adjective', 'noun', 'verb', 'adjective', 'noun'];

    if (options.useMoreWords) {
      template = [
        'article',
        'adjective',
        'noun',
        'verb',
        'article',
        'adjective',
        'noun',
      ];
    }

    if (options.useDiceware) {
      template = ['diceware', 'diceware', 'diceware', 'diceware', 'diceware'];

      if (options.useMoreWords)
        template = template.concat(['diceware', 'diceware']);
    }

    const sentence = sentencePassword(template, {
      useNumbers: options.useNumbers,
      useSymbols: options.useSymbols,
      useSpaces: options.useSpaces,
    });

    const entropy = sentence.entropy.toFixed(1);
    // on average, only half the possibilities will be needed.  so -1 exponent
    // 1e12 = 1x10^12 (1 trillion)
    const possibles = Math.pow(2, sentence.entropy - 1);
    const large_guesses_per_seconds = 1e12 * 1;
    const large_guesses_per_minutes = 1e12 * 60;
    const large_guesses_per_hours = 1e12 * 3600;
    const large_guesses_per_days = 1e12 * 86400;
    const large_guesses_per_years = 1e12 * 31536000;
    const guessesPerSecond = commaSeparateNumber(
      (possibles / large_guesses_per_seconds).toFixed(1)
    );
    const guessesPerMinute = commaSeparateNumber(
      (possibles / large_guesses_per_minutes).toFixed(1)
    );
    const guessesPerHour = commaSeparateNumber(
      (possibles / large_guesses_per_hours).toFixed(1)
    );
    const guessesPerDay = commaSeparateNumber(
      (possibles / large_guesses_per_days).toFixed(1)
    );
    const guessesPerYear = commaSeparateNumber(
      (possibles / large_guesses_per_years).toFixed(1)
    );

    const data = {
      password: sentence.password,
      entropy: entropy,
      guesses: {
        per_second: guessesPerSecond,
        per_minute: guessesPerMinute,
        per_hour: guessesPerHour,
        per_day: guessesPerDay,
        per_year: guessesPerYear,
      },
    };

    return data;
  };

  if (localStorage.random_seed) {
    buffer = seedOracle(localStorage.random_seed + new Date().valueOf());
  }
}

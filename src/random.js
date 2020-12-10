/**
 * Class for secure random number generation.
 *
 * @example
 * random.addEntropy(anything) to add some randomness.
 * random.random(max) or random.choice(array) to get some.
 */
export function Random() {
  let buffer = '';
  let local_storage =
    typeof window.localStorage != 'undefined' ? localStorage : {};

  function seedOracle(buffer) {
    return Crypto.SHA256(buffer + 'seed').toString();
  }

  function outputOracle(buffer) {
    return Crypto.SHA256(buffer + 'output').toString();
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

  if (localStorage.random_seed) {
    buffer = seedOracle(localStorage.random_seed + new Date().valueOf());
  }
}

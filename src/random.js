/**
 * Class for secure random number generation.
 *
 * @example
 * random.addEntropy(anything) to add some randomness.
 * random.random(max) or random.choice(array) to get some.
 */

export function Random() {
  var buffer = '';
  var local_storage =
    typeof window.localStorage != 'undefined' ? localStorage : {};
  var TOTAL_EVENTS = 500;
  var events_left = TOTAL_EVENTS;
  var that = this;

  function seedOracle(buffer) {
    return CryptoJS.SHA256(buffer + 'seed');
  }

  function outputOracle(buffer) {
    return CryptoJS.SHA256(buffer + 'output');
  }

  function random_2(bits) {
    var output = getRandomBuffer();
    if (output.length * 4 < bits) throw new Error('not enough bits in buffer');
    var hex = output.words.slice(0, Math.ceil(bits / 4));
    return parseInt(hex, 16);
  }

  function updateLocalStorage() {
    if (that.ready()) {
      local_storage.random_seed = outputOracle(buffer);
      // You must rehash the buffer after (or before) outputting the hash.
      // Otherwise you may get the same result again and again.
      buffer = seedOracle(buffer);
    }
  }

  function updateLocalStorageTimeout() {
    updateLocalStorage();
    setTimeout(updateLocalStorageTimeout, 5000);
  }
  setTimeout(updateLocalStorageTimeout, 5000);

  /**
   * Core random generation function.
   *
   * Returns a cryptographically secure pseudo-random 256-bit hexadecimal
   * string.  Though, usually just
   * '1ec1c26b50d5d3c58d9583181af8076655fe00756bf7285940ba3670f99fcba0'.
   */
  function getRandomBuffer() {
    var output = outputOracle(buffer);
    buffer = seedOracle(buffer);
    updateLocalStorage();
    return output;
  }

  /**
   * `random` returns n such that `0 <= n < max`
   * `max` must be greater than 0.
   */
  this.random = function (max) {
    if (max < 1) throw new Error('`random()` expects a max greater than 0.');
    else if (max == 1) return 0;

    var bits = Math.ceil(Math.log(max) / Math.log(2));
    var n;

    do {
      n = random_2(bits);
    } while (n >= max);

    return n;
  };

  /**
   * Returns a random element from an array.
   */
  this.choice = function (ary) {
    if (ary.length == 0) return;
    var i = this.random(ary.length);
    return ary[i];
  };

  /**
   * Returns true if enough entropy has been collected.
   */
  this.ready = function () {
    return events_left <= 0;
  };

  /**
   * Add some entropy to the internal buffer.
   */
  this.addEntropy = function (entropy) {
    events_left--;
    buffer = seedOracle(buffer + entropy);
  };

  // Main
  if (local_storage.random_seed) {
    /* we've got a seed from last time, add time to it just in case...*/
    buffer = seedOracle(localStorage.random_seed + new Date().valueOf());
    events_left = TOTAL_EVENTS = 0;
  }
}

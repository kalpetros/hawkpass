import { words } from './wordlist';
import { Random } from './random';

const addEntropy = (x, y, ms) => {
  reminder_elem.removeClass('visible');
  if (reminder_timeout) clearTimeout(reminder_timeout);
  reminder_timeout = setTimeout(show_reminder, 5000);

  random.addEntropy(x + y + ms);
  events_left--;
  if (events_left == 0) {
    // $('.entropy_page').hide();
    // $('.password_page').show();
    generate_password();
  } else if (events_left > 0 && events_left % 10 == 0) {
    more_entropy_progress_div.css(
      'width',
      ((TOTAL_EVENTS - events_left) / TOTAL_EVENTS) * 100 + '%'
    );
  }
};

const addReplacement = (replacements, string) => {
  let chars = string.split(''),
    i,
    replaceable = new RegExp('[' + Object.keys(replacements) + ']', 'g');

  do {
    i = random.random(chars.length);
  } while (!chars[i].match(replaceable));

  chars[i] = replacements[chars[i]];

  return {
    password: chars.join(''),
    entropy: Math.log(string.match(replaceable).length) / Math.log(2),
  };
};

const sentencePassword = (template, options) => {
  let entropy = 0,
    sentence = [],
    haystack,
    token,
    i;

  const random = new Random();

  for (i = 0; i < template.length; i++) {
    token = template[i];
    haystack = words[token];

    if (!haystack) throw new Error('Unknown token "' + token + '"');

    sentence.push(random.choice(haystack));
    entropy += Math.log(haystack.length) / Math.log(2);
  }

  if (!options.useSpaces) {
    // Capitalize the letters if we don't use spaces
    for (i = 0; i < sentence.length; i++) {
      token = sentence[i];
      token = token.substr(0, 1).toUpperCase() + token.substr(1);
      sentence[i] = token;
    }
  }

  let ret = {
    password: sentence.join(' '),
    entropy: entropy,
  };
  if (options.useNumber) {
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
  if (options.useSymbol) {
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
  if (!options.useSpaces) {
    ret.password = ret.password.replace(/ /g, '');
  }
  return ret;
};

export const generate = options => {
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
    useNumber: options.useNumber,
    useSymbol: options.useSymbol,
    useSpaces: options.useSpaces,
  });

  const entropy = sentence.entropy.toFixed(1);
  // on average, only half the possibilities will be needed.  so -1 exponent
  // 1e12 = 1x10^12 (1 trillion)
  const possibles = Math.pow(2, sentence.entropy - 1);
  const large_guesses_per_seconds = 1e12 * 1;
  const large_guesses_per_minutes = 1e12 * 60;
  const large_guesses_per_hour = 1e12 * 3600;
  const large_guesses_per_days = 1e12 * 86400;
  const large_guesses_per_years = 1e12 * 31536000;

  const password = {
    password: sentence.password,
    entropy: entropy,
    gps: commaSeparateNumber(
      (possibles / large_guesses_per_seconds).toFixed(1)
    ),
    gpm: commaSeparateNumber(
      (possibles / large_guesses_per_minutes).toFixed(1)
    ),
    gph: commaSeparateNumber((possibles / large_guesses_per_hour).toFixed(1)),
    gpd: commaSeparateNumber((possibles / large_guesses_per_days).toFixed(1)),
    gpy: commaSeparateNumber((possibles / large_guesses_per_years).toFixed(1)),
  };

  return password;
};

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
}

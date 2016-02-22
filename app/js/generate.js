// Copyright 2011 Gavin Wahl, Colin Thomas-Arnold, Fusionbox.
// Modified by Petros Kalogiannakis. All rights reserved.

// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:

//   1. Redistributions of source code must retain the above copyright notice, this list of
//      conditions and the following disclaimer.

//   2. Redistributions in binary form must reproduce the above copyright notice, this list
//      of conditions and the following disclaimer in the documentation and/or other materials
//      provided with the distribution.

// THIS SOFTWARE IS PROVIDED BY FUSIONBOX ''AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL FUSIONBOX OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of Fusionbox.
function(exports, $) {
  alert("aasdasd");
  var TOTAL_EVENTS = 500
    , events_left = TOTAL_EVENTS;

  if ( random.ready() ) {
    events_left = 0;
  };

  function parseOptions(options) {
    return $.extend({
        use_number: false
      , use_symbol: false
      , use_spaces: true
      }, options);
    };

  exports.sentencePassword = function(template, options) {
    var entropy = 0
      , sentence = []
      , haystack
      , token
      , i;

    options = parseOptions(options);

    for ( i = 0; i < template.length; i++ ) {
      token = template[i];
      haystack = words[token];

      if ( ! haystack )
        throw new Error('Unknown token "' + token + '"');

      sentence.push(random.choice(haystack));
      entropy += Math.log(haystack.length)/Math.log(2);
    };

    if (!options.use_spaces) // Capitalize the letters if we don't use spaces
    {
      for ( i = 0; i < sentence.length; i++ ) {
        token = sentence[i];
        token = token.substr(0, 1).toUpperCase() + token.substr(1);
        sentence[i] = token;
      }
    };

    var ret = {
      password: sentence.join(" ")
    , entropy: entropy
    };
    if ( options.use_number )
    {
      var new_password = exports.addReplacement({
        'a': '4',
        'e': '3',
        'i': '1',
        'o': '0',
        'q': '9',
        's': '5',
        't': '7',
        'z': '2'
        }, ret.password);
      ret.password = new_password.password;
      ret.entropy += new_password.entropy;
    };
    if ( options.use_symbol )
    {
      var new_password = exports.addReplacement({
        'a': '@',
        'b': '|3',
        'c': '(',
        'h': '|-|',
        'i': '!',
        'k': '|<',
        'l': '|',
        't': '+',
        'v': '\\/',
        's': '$',
        'x': '%'
        }, ret.password);
      ret.password = new_password.password;
      ret.entropy += new_password.entropy;
    };
    if ( ! options.use_spaces )
    {
      ret.password = ret.password.replace(/ /g, '');
    };
    return ret;
  };

  exports.addReplacement = function(replacements, string) {
    var chars = string.split('')
      , i
      , replaceable = new RegExp('[' + Object.keys(replacements) + ']', 'g');

    do {
      i = random.random(chars.length);
    } while ( ! chars[i].match(replaceable) )

    chars[i] = replacements[chars[i]];
    return {
      password: chars.join('')
    , entropy: Math.log(string.match(replaceable).length)/Math.log(2)
    };
  };

  exports.templateEntropy = function(template, options) {
    var entropy = 0
      , haystack;

    options = parseOptions(options);

    return entropy;
  };

  $(document).ready(function() {
    var more_entropy_progress_div = $('.entropy_mouse .entropy_bar div')
      , reminder_elem = $('.entropy_mouse .reminder')
      , show_reminder = function() { reminder_elem.addClass('visible'); }
      , reminder_timeout = null
      , generate_password = function() {
          var template = ['adjective', 'noun', 'verb', 'adjective', 'noun']
            , options_form = $('#options')[0];

          if ( options_form.use_more_words.checked )
            template = ['article', 'adjective', 'noun', 'verb', 'article', 'adjective', 'noun'];

          if ( options_form.diceware.checked ) {
            template = ['diceware', 'diceware', 'diceware', 'diceware', 'diceware'];
            if ( options_form.use_more_words.checked )
              template = template.concat(['diceware', 'diceware']);
          }

          var sentence = exports.sentencePassword(template, {
            use_number: options_form.use_number.checked
          , use_symbol: options_form.use_symbol.checked
          , use_spaces: options_form.use_spaces.checked
          });

          $('.mainb .password').text(sentence.password);

          var entropy = sentence.entropy.toFixed(1)
            , possibles = Math.pow(2, sentence.entropy - 1) // on average, only half the possibilities will be needed.  so -1 exponent
            // 1e12 = 1x10^12 (1 trillion)
            , large_guesses_per_seconds = 1e12 * 1
            , large_guesses_per_minutes = 1e12 * 60
            , large_guesses_per_hour = 1e12 * 3600
            , large_guesses_per_days = 1e12 * 86400
            , large_guesses_per_years = 1e12 * 31536000
            , large_guesses_per_lifespan = 1e12 * 2522880000
            , large_guesses_per_millenia = 1e12 * 31536000000
            , large_guesses_per_universe = 1e12 * 3600*(13.798+0.037)*(10^9);
          // Seperate numbers with commas
          function commaSeparateNumber(val){
            while (/(\d+)(\d{3})/.test(val.toString())){
              val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
            }
            return val;
          };

          $('.stats .entropy').html(entropy + " bits of entropy");
          $('.stats .seconds').html("~ " + commaSeparateNumber((possibles / large_guesses_per_seconds).toFixed(1)) + " seconds");
          $('.stats .minutes').html("~ " + commaSeparateNumber((possibles / large_guesses_per_minutes).toFixed(1)) + " minutes");
          $('.stats .hours').html("~ " + commaSeparateNumber((possibles / large_guesses_per_hour).toFixed(1)) + " hours");
          $('.stats .days').html("~ " + commaSeparateNumber((possibles / large_guesses_per_days).toFixed(1)) + " days");
          $('.stats .years').html("~ " + commaSeparateNumber((possibles / large_guesses_per_years).toFixed(1)) + " years");
          $('.stats .worstcase').html("Worst case scenario:");
          $('.stats .worstcase').css("border-bottom", "1px solid #009966");
          $('.stats .worstcasetext').html("Assuming that someone is capable of guessing passwords at the rate of a trillion (1,000,000,000,000) key/second, a search on 50% of the total keyspace will take:");
        }
      , reset_password = function() {
          $('.mainb .password').text("Click Generate to generate a new password");
          $('.stats .entropy').html("");
          $('.stats .seconds').html("");
          $('.stats .minutes').html("");
          $('.stats .hours').html("");
          $('.stats .days').html("");
          $('.stats .years').html("");
          $('.stats .worstcase').html("");
          $('.stats .worstcasetext').html("");
          $('.stats .worstcase').css("border", "none");
        };
    // Check checkboxes
    $('input[type="checkbox"]:checked').parent('label').addClass('active');
    // Tooltip
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    // Popover
    $('.fa-info-circle').popover(options);

    $('#generate_button').click(generate_password);

    $('#reset_button').click(reset_password);

    if ( events_left == 0 ) {
      $('.entropy_mouse').hide();
      $('.mainb').show();
      generate_password();
    }

    var add_entropy = function(x, y, ms) {
      reminder_elem.removeClass('visible');
      if ( reminder_timeout )
        clearTimeout(reminder_timeout);
      reminder_timeout = setTimeout(show_reminder, 5000);

      random.addEntropy(x + y + ms);
      events_left--;
      if (  events_left == 0 ) {
        $('.entropy_mouse').hide();
        $('.mainb').show();
        generate_password();
      }
      else if ( events_left > 0 && events_left % 10 == 0 )
      {
        more_entropy_progress_div.css('width', ((TOTAL_EVENTS - events_left)/TOTAL_EVENTS * 100) + '%');
      }
    };

    $(document).on('mousemove', function(event) {
      add_entropy(event.clientX, event.clientY, event.timeStamp);
    }).on('touchmove', function(event) {
      if ( !random.ready() && navigator.userAgent.match(/android/i) ) {
        // android only fires a single touchmove unless preventDefault.
        // this makes the initial entropy collection faster without messing up
        // drags later.
        event.preventDefault();
      }
      event = event.originalEvent;
      add_entropy(event.touches[0].clientX, event.touches[0].clientY, event.timeStamp);
    });
  });
})(window, jQuery);

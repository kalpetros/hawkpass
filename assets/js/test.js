// Load jQuery
$ = require('./bower_components/jquery/dist/jquery.min.js');
// Start
$(document).ready(function(){
  $('.generate').click(function() {
    var x = Math.random();
    var y = Math.random();
    var result = x*100+y*100;
    $('.password').append(result);
    $('.stats_box').show();
    $('.bits_of_entropy').append(result.toFixed(2) + " bits of entropy");
    $('.one').append(result.toFixed(0));
  })
  $('.reset').click(function() {
    $('.password').empty();
    $('.bits_of_entropy').empty();
    $('.one').empty();
    $('.stats_box').hide();
  })
});

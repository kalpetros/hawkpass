(function(exports, $) {
  $(document).ready(function(){
    $('.stats_box').hide();
    $('.entropy').hide();
    $('.generate').click(function() {
      var x = Math.random();
      var y = Math.random();
      var result = x*100+y*100;
      $('.password').empty();
      $('.bits_of_entropy').empty();
      $('.one, .two, .three, .four, .five').empty();
      $('.password').append("Testing " + result.toFixed(0));
      $('.stats_box').show();
      $('.bits_of_entropy').append(result.toFixed(2) + " bits of entropy");
      $('.one').append(result.toFixed(0)*100000);
      $('.two').append(result.toFixed(0)*10000);
      $('.three').append(result.toFixed(0)*1000);
      $('.four').append(result.toFixed(0)*100);
      $('.five').append(result.toFixed(0)*10);
    })
    $('.reset').click(function() {
      $('.password').empty();
      $('.bits_of_entropy').empty();
      $('.one, .two, .three, .four, .five').empty();
      $('.stats_box').hide();
    })
  });
})(window, jQuery)

$(document).ready(function(){
  $('.stats_box').hide();
  $('.generate').click(function() {
    var x = Math.random();
    var y = Math.random();
    var result = x*100+y*100;
    $('.password').append("LairYe+DoraFoistEthos");
    $('.stats_box').show();
    $('.bits_of_entropy').append("67.9" + " bits of entropy");
    $('.one').append("142,151,440.1");
    $('.two').append("2,369,190.7");
    $('.three').append("39,486.5");
    $('.four').append("1,645.3");
    $('.five').append("4.5");
  })
  $('.reset').click(function() {
    $('.password').empty();
    $('.bits_of_entropy').empty();
    $('.one').empty();
    $('.stats_box').hide();
  })
});

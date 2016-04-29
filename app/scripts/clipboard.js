$(document).ready(function() {
  // Copied alert box initially hidden
  $('.copied').hide();
  var clipboard = new Clipboard('.clipboard');

  // Show copied alert box
  clipboard.on('success', function() {
    $('.copied').show();
    $('.copied').fadeOut(4000);
  });
});

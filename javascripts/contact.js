$(document).ready(function() {
  console.log("hello world");
  var form = $('#messageForm');
  console.log("form: ", form);
  form.submit(function(event) {
    console.log("submitted the form");
    $.post( "http://localhost:5000/charges.json", function( data ) {
      console.log("result: ", data);
    });
    event.preventDefault();
  });

  var redirectUrl = window.location.protocol + "//" + window.location.host + "/contactConfirmation.html";
  console.log("Redirect url: ", redirectUrl);
  $("#redirectUrl").val(redirectUrl);
});

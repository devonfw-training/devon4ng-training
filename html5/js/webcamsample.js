jQuery( function() {
  
  jQuery("#my_camera").on("click", function() {
    Webcam.attach( '#my_camera' );
  });
});


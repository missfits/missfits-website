const FOLDER = "/assets/images/photos/";

function loadImages(folder) {
  console.log(FOLDER + folder);
  $.ajax({
    url : FOLDER + folder,
    success: function (data) {
      $(data).find("a").attr("href", function (i, val) {
        if (val.toLowerCase().match(/\.(jpe?g|png|gif)$/)) {
          $("#images").append("<img src='" + val + "' alt='image'>");
        }
      });
    }
  });
}
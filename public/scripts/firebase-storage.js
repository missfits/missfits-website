const storage = firebase.storage();
const storageRef = storage.ref();

function loadImages(folder) {
  let listRef = storageRef.child(folder);
  listRef.listAll().then(function(res) {
    res.items.forEach(function(imageRef) {
      imageRef.getDownloadURL().then(function(url) {
        $("#images").append("<img src='" + url + "' alt='image'>");
      })
    });
  }).catch((error) => alert(error.message));
}
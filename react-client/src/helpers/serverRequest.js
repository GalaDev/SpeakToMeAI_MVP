const serverRequest = (type, urlEnd, state, callback) => {
  const currentObj = this;
  $.ajax({
    type: type,
    url: "http://localhost:3000/" + urlEnd,
    data: state,
    context: currentObj,
    success: function (data) {
      callback(null, data);
    },
    error: function (err) {
      console.log("Error message from AJAX", err);
      callback(err)
    }
  });
}

export default serverRequest;
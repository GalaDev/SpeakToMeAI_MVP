const serverRequest = (type, urlEnd, state, callback) => {
  $.ajax({
    type: type,
    url: "http://localhost:3000/" + urlEnd,
    data: state,
    success: function (data) {
      callback(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

export default serverRequest;
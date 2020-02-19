const serverRequest = (type, urlEnd, state, callback) => {
  $.ajax({
    type: type,
    url: "http://localhost:3000/" + urlEnd,
    data: state,
    success: (data) => {
      callback(null, data);
    },
    error: function (err) {
      console.log(err);
      callback(err)
    }
  });
}

export default serverRequest;
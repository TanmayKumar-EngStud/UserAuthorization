function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var data = {
    username: username,
    password: password,
  };
  // jsonify data
  var json = JSON.stringify(data);
  console.log(json);
  // send data to server at localhost:3000
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/users/login", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var json = xhr.responseText;
      var obj = JSON.parse(json);
      console.log(obj);
      if (obj.success) {
        window.location.href = "http://localhost:3000";
      } else {
        alert("Invalid username or password");
      }
    }
  };
}

function signin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var data = {
    username: username,
    password: password,
  };
  // jsonify data
  var json = JSON.stringify(data);
  console.log(json);
  // send data to server at localhost:3000
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/users/signin", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var json = xhr.responseText;
      var obj = JSON.parse(json);
      console.log(obj);
      if (obj.success) {
        window.location.href = "http://localhost:3000";
      } else {
        alert("some error occured");
      }
    }
  };
}

// Declare variables at the beginning
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var users = [];
if (localStorage.getItem("usersList") !== null) {
  users = JSON.parse(localStorage.getItem("usersList"));
}

function signUP() {
  if (signupEmpaty() == false) {
    document.getElementById("exist").innerHTML =
      '<p class="text-danger m-3">All inputs is required</p>';
    return false;
  }
  if (!isGmail(signupEmail.value)) {
    document.getElementById("exist").innerHTML =
      '<p class="text-danger m-3">Email must be a valid @gmail.com address</p>';
    return false;
  }
  if (signupEmail !== "" && signupName !== "" && signupPassword) {
    if (emailExist()) {
      document.getElementById("exist").innerHTML =
        '<p class="text-danger">Email already exists</p>';
    } else {
      var usersList = {
        email: signupEmail.value,
        Password: signupPassword.value,
        name: signupName.value,
      };
      users.push(usersList);
      localStorage.setItem("usersList", JSON.stringify(users));
      document.getElementById("exist").innerHTML =
        '<p class="text-success">Success</p>';
        location.replace("index.html");           
        signupName.value = "";
        signupEmail.value = "";
        signupPassword.value = "";
    }
  }
}
function signupEmpaty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}
function isGmail(email) {
  return email.endsWith("@gmail.com");
}

function emailExist() {
  return users.some((user) => user.email === signupEmail.value);
}

function logIN() {
  if (signinEmpaty() == false) {
    document.getElementById("exists").innerHTML =
      '<p class="text-danger m-3">All inputs is required</p>';
    return false;
  } else {
    if (login()) {
      location.replace("home.html");
    }else{
    document.getElementById("exists").innerHTML =
      '<p class="text-danger m-3">Incorrect email or password</p>';
    }
  }
}
function login() {
  var user = users.find(
      (user) =>
          user.email === signinEmail.value &&
          user.Password === signinPassword.value
  );

  if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return true;
  }
  return false;
}
function signinEmpaty() {
  if (
    signinEmail.value == "" ||
    signinPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function welcome() {
  var user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
      document.getElementById("welcome").innerHTML = `Welcome ${user.name}`;
  }
}

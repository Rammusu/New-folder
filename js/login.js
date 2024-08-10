// Buttons to 'switch' the page
var openSignUpButton = document.getElementById("slide-left-button");
var openSignInButton = document.getElementById("slide-right-button");

// The sidebars
var leftText = document.getElementById("sign-in");
var rightText = document.getElementById("sign-up");

// The forms
var accountForm = document.getElementById("sign-in-info");
var signinForm = document.getElementById("sign-up-info");

// Open the Sign Up page
openSignUp = () => {
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation-out");
  overlay.classList.remove("open-sign-in");
  rightText.classList.remove("overlay-text-right-animation");
  // Add classes for animations
  accountForm.className += " form-left-slide-out";
  rightText.className += " overlay-text-right-animation-out";
  overlay.className += " open-sign-up";
  leftText.className += " overlay-text-left-animation";
  // hide the sign up form once it is out of view
  setTimeout(function () {
    accountForm.classList.remove("form-left-slide-in");
    accountForm.style.display = "none";
    accountForm.classList.remove("form-left-slide-out");
  }, 700);
  // display the sign in form once the overlay begins moving right
  setTimeout(function () {
    signinForm.style.display = "flex";
    signinForm.classList += " form-right-slide-in";
  }, 200);
};

// Open the Sign In page
openSignIn = () => {
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation");
  overlay.classList.remove("open-sign-up");
  rightText.classList.remove("overlay-text-right-animation-out");
  // Add classes for animations
  signinForm.classList += " form-right-slide-out";
  leftText.className += " overlay-text-left-animation-out";
  overlay.className += " open-sign-in";
  rightText.className += " overlay-text-right-animation";
  // hide the sign in form once it is out of view
  setTimeout(function () {
    signinForm.classList.remove("form-right-slide-in");
    signinForm.style.display = "none";
    signinForm.classList.remove("form-right-slide-out");
  }, 700);
  // display the sign up form once the overlay begins moving left
  setTimeout(function () {
    accountForm.style.display = "flex";
    accountForm.classList += " form-left-slide-in";
  }, 200);
};

// When a 'switch' button is pressed, switch page
openSignUpButton.addEventListener("click", openSignUp, false);
openSignInButton.addEventListener("click", openSignIn, false);

// -------------------------------------------------
const user_list = JSON.parse(localStorage.getItem("user_list")) || []; // lay du lieu tu local storage
// bat su kien cho nut login
document.querySelector("#signin_btn").onclick = function (e) {
  e.preventDefault();
  // lay du lieu tu input form
  const email = document.getElementById("signin_email").value;
  const password = document.getElementById("signin_password").value;
  const username = "abc"; // just for test
  if (validateForm({ email: email, password: password, username: username })) {
    // neu nhu khong co loi trong phan kiem tra form => kiem tra du lieu trong local storage
    const user_found = user_list.filter(
      (user) => user.email === email && user.password === password
    )[0];
    if (user_found) {
      // hien thi dang nhap thanh cong
      alert("Dang nhap thanh cong!");
      localStorage.setItem("current_user", JSON.stringify(user_found)); // luu vao local storage
      window.close(); // dong tab hien tai
    } else {
      alert("Thong tin khong chinh xac hoac ban chua co tai khoan");
      return;
    }
  }
};

// bat su kien cho nut signup
document.querySelector("#signup_btn").onclick = function (e) {
  e.preventDefault();
  // lay du lieu tu input form
  const email = document.getElementById("signup_email").value;
  const password = document.getElementById("signup_password").value;
  const username = document.getElementById("signup_username").value;
  const new_user = { email: email, password: password, username: username };
  if (validateForm(new_user)) {
    if (user_list.length) {
      // neu nhu khong co loi trong phan kiem tra form => kiem tra du lieu trong local storage
      const user_duplicated = user_list.filter(
        (user) => user.email === email || user.username === username
      )[0];
      if (user_duplicated) {
        // hien thi dang nhap thanh cong
        alert(
          "Tai khoan da ton tai trong he thong, vui long chuyen sang dang nhap"
        );
        return;
      }
    }
    alert("Dang ky thanh cong");
    // luu user vao local storage
    user_list.push(new_user);
    localStorage.setItem("user_list", JSON.stringify(user_list)); // luu vao local storage
    window.close(); // dong tab hien tai
  }
};

// kiem tra du lieu dau vao
function validateForm(form_data) {
  if (!(form_data.email && form_data.password && form_data.username)) {
    alert("Can dien day du thong tin");
    return false;
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form_data.email)
  ) {
    alert("Email khong hop le");
    return false;
  } else if (form_data.password.length < 6) {
    alert("Password can it nhat 6 chu so");
    return false;
  }
  return true;
}

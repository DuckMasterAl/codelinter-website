function getCookie(name) {// Gets a cookie :D
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function makestate() {// Used on main oauth page
  const urlParams = new URLSearchParams(window.location.search);
  const token_cookie = getCookie('token');
  const query = urlParams.get("code");
  const query2 = urlParams.get("error");
  if (query2 != null) {
    document.location.replace("error.html?error=" + query2);
  } else if (query == null && token_cookie == null) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 40; i++)
      text += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    // This gets the time of the state cookie (1 day)
    var date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);// 1 day
    var expires = "; expires=" + date.toUTCString();
    document.cookie = "state=" + (text || "") + expires + "; path=/";
    document.location.replace(
      "https://github.com/login/oauth/authorize?client_id=eb8d5d1d67f9e842e89b&scope=repo&state=" +
      text);
  } else {
    const state_param = urlParams.get("state");
    const state_cookie = getCookie("state");
    if (state_param != state_cookie && state_param != undefined && query != undefined || state_param == undefined && query != undefined) {
      document.location.replace("error.html?error=state");
    } else {
      var date = new Date();
      date.setTime(date.getTime() + (5*60*1000));// 5 minutes
      var expires = "; expires=" + date.toUTCString();
      if (query != null) {
        document.cookie = "token=" + (query || "") + expires + "; path=/";
      }
      else if (token_cookie == null) {
        document.location.replace("error.html?error=no_token");
      }
      document.location.replace('success.html');
    }
  }
}

function newToken() {// Gets a new code
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 40; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  // This gets the time of the state cookie (1 day)
  var date = new Date();
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day
  var expires = "; expires=" + date.toUTCString();
  document.cookie = "state=" + (text || "") + expires + "; path=/";
  document.location.replace(
    "https://github.com/login/oauth/authorize?client_id=eb8d5d1d67f9e842e89b&scope=repo&state=" +
    text);
}

function getToken() {// Gets the code from your cookies!
  var token = getCookie('token')
  if (token == null) {
    document.location.replace("error.html?error=no_token");
  }
  document.getElementById('token').innerHTML = 'Here\'s your Token: ' + token
}

function getError() {// Get the error query | Used on oauth error page
  var urlParams = new URLSearchParams(window.location.search);
  var query = urlParams.get("error");
  var html = document.getElementById('error_msg')
  if (query == 'access_denied') {
    html.innerHTML = "You denied us access to our oauth :("
  }
  else if (query == 'no_token') {
    html.innerHTML = "Something went wrong when fetching your token!";
  }
  else if (query == 'state') {
    html.innerHTML = "We have blocked this request due to a security risk.";
  }
  else if (query == null) {
    html.innerHTML = 'An Unknown Error has Occured!'
  }
  else {
    html.innerHTML = query;
  }
}

function jsLoad() {
  if (document.getElementsByClassName('bottom')[0] != undefined) {
    var date = new Date().getFullYear()
    document.getElementsByClassName('footer_date')[0].innerHTML = date + ' ';
    document.getElementsByClassName('footer_date')[1].innerHTML = date + ' ';
  }
  document.body.style.visibility='visible';
  const cookie = getCookie('cookie');
  if (cookie == "1" &&  document.getElementsByClassName('bottom')[0] != undefined) {
    document.getElementsByClassName('bottom')[0].style.bottom = '5px';
    document.getElementsByClassName('bottom2')[0].style.bottom = '5px';
    document.getElementsByClassName('cookie')[0].style.display = 'none';
  }
}

function acceptCookies() {
  document.getElementsByClassName('bottom')[0].style.bottom = '5px';
  document.getElementsByClassName('bottom2')[0].style.bottom = '5px';
  document.getElementsByClassName('cookie')[0].style.display = 'none';
  var date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  var expires = "; expires=" + date.toUTCString();
  document.cookie = "cookie=1" + expires + "; path=/";
}

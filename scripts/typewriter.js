var i = 0;
var txt = "Hi! I'm Calvin.";
var speed = 250;
var cursorVisible = false;

function type() {
  if (i < txt.length) {
document.getElementById("typewriter").innerHTML += txt.charAt(i);
    i++;
    setTimeout(type, speed);
  } else {
    flashCursor();
  }

  
}

function flashCursor() {
  var text = document.getElementById("typewriter");
  if (!cursorVisible) {
    text.innerHTML += "&#x258C";
    cursorVisible = true;
    setTimeout(type, speed);
  } else {
    text.innerHTML = text.innerHTML.slice(0,-1);
    cursorVisible = false;
    setTimeout(type, speed);
  }
  
}

window.onload = type;

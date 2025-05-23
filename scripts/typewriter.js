var i = 0;
var txt = "Hi! I'm Calvin.";
var speed = 250;

function type() {
  if (i < txt.length) {
    document.getElementById("typewriter").innerHTML += txt.charAt(i);
    i++;
    setTimeout(type, speed);
  }
  
}

window.onload = type;

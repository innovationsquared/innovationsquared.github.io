document.addEventListener("DOMContentLoaded", function () {
  function Aimbot(event) {
    const x = event.clientX;
    const y = event.clientY;
    document.getElementById("position").textContent = "X: " + x + " Y: " + y;
  }

  document.addEventListener("mousemove", Aimbot);
});

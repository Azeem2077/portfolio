// ---------------- Slideshow ----------------
let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i=0;i<slides.length;i++) slides[i].style.display = "none";
  slideIndex++;
  if(slideIndex>slides.length) slideIndex=1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000);
}
showSlides();

// ---------------- Typewriter Effect ----------------
// ---------------- Typewriter Effect ----------------
const aboutText = "Hi, I'm a developer passionate about building modern web, mobile, and desktop applications with a creative twist ✨.\nI love to learn new things every day and adapt quickly to new challenges.\nI’m flexible enough to work on any kind of project with dedication and curiosity 🚀.";

let i = 0;
function typeWriter() {
  if (i < aboutText.length) {
    let char = aboutText.charAt(i);
    if(char === '\n') {
      document.getElementById("aboutText").innerHTML += "<br>";
    } else {
      document.getElementById("aboutText").innerHTML += char;
    }
    i++;
    setTimeout(typeWriter, 30);
  }
}
window.addEventListener("load", typeWriter);

// ---------------- Batman ----------------
const batman = document.getElementById("batman");
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let speedX = 2;
let speedY = 2;
const maxSpeed = 5; // cap speed

function moveBatman() {
  const batWidth = batman.offsetWidth;
  const batHeight = batman.offsetHeight;
  const maxX = window.innerWidth - batWidth;
  const maxY = window.innerHeight - batHeight;

  // Move normally
  x += speedX;
  y += speedY;

  // Bounce off edges
  if (x <= 0 || x >= maxX) speedX *= -1;
  if (y <= 0 || y >= maxY) speedY *= -1;

  // Keep inside boundaries
  x = Math.min(Math.max(0, x), maxX);
  y = Math.min(Math.max(0, y), maxY);

  batman.style.left = x + "px";
  batman.style.top = y + "px";

  createTrail(x + batWidth / 2, y + batHeight / 2);

  requestAnimationFrame(moveBatman);
}

// Create glowing trail
function createTrail(cx, cy) {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = cx + "px";
  trail.style.top = cy + "px";
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 800);
}

// Repulsion from cursor / touch
function repelFromPointer(px, py) {
  const dx = x - px;
  const dy = y - py;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 150) {
    // speed is proportional but capped
    speedX = Math.min(maxSpeed, (dx / dist) * 5);
    speedY = Math.min(maxSpeed, (dy / dist) * 5);
  }
}

document.addEventListener("mousemove", e => repelFromPointer(e.clientX, e.clientY));
document.addEventListener("touchmove", e => {
  if(e.touches.length > 0){
    repelFromPointer(e.touches[0].clientX, e.touches[0].clientY);
  }
});

// Recalculate boundaries on resize
window.addEventListener("resize", () => {
  x = Math.min(x, window.innerWidth - batman.offsetWidth);
  y = Math.min(y, window.innerHeight - batman.offsetHeight);
});

moveBatman();



const canvas = document.getElementById('footer-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    // Start near the footer
    this.x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
    this.y = window.innerHeight - 50 + (Math.random() - 0.5) * 50;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = -Math.random() * 1.5 - 0.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.alpha = Math.random() * 0.8 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.005;

    // Reset particle if it fades or moves off screen
    if (this.alpha <= 0 || this.y < 0) this.reset();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Create particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animate particles
function animate() {
  // Semi-transparent background for trailing effect
  ctx.fillStyle = 'rgba(17,17,17,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("celebrationCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = [
    "#f72585", // Bright Pink
    "#b5179e", // Purple
    "#7209b7", // Deep Purple
    "#ffd166", // Gold / Yellow
    "#06d6a0", // Soft Mint
    "#ff70a6"  // Rose
  ];

  // 1. Balloon Class (Floats from bottom to top)
  class Balloon {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? height + Math.random() * height * 0.5 : height + 100;
      this.radius = Math.random() * 14 + 18; // Balloon size
      this.speed = Math.random() * 2 + 1.8;
      this.swingSpeed = Math.random() * 0.03 + 0.015;
      this.swingOffset = Math.random() * Math.PI * 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.stringLength = this.radius * 2.2;
    }

    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.y * this.swingSpeed + this.swingOffset) * 0.8;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Balloon body
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.ellipse(0, 0, this.radius, this.radius * 1.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Balloon reflection highlight
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.ellipse(-this.radius * 0.35, -this.radius * 0.45, this.radius * 0.25, this.radius * 0.4, -0.4, 0, Math.PI * 2);
      ctx.fill();

      // Balloon knot
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(-4, this.radius * 1.22);
      ctx.lineTo(4, this.radius * 1.22);
      ctx.lineTo(0, this.radius * 1.32);
      ctx.closePath();
      ctx.fill();

      // Balloon string
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.moveTo(0, this.radius * 1.32);
      ctx.quadraticCurveTo(8, this.radius * 1.7, 0, this.radius * 1.32 + this.stringLength);
      ctx.stroke();

      ctx.restore();
    }
  }

  // 2. Confetti Particle Class (Spins and falls)
  class Confetti {
    constructor() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 150;
      this.size = Math.random() * 7 + 5;
      this.speedY = Math.random() * 3 + 2.5;
      this.speedX = Math.random() * 2 - 1;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 8 + 3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      ctx.restore();
    }
  }

  const balloonCount = 28;
  const confettiCount = 60;
  const balloons = Array.from({ length: balloonCount }, () => new Balloon());
  const confetti = Array.from({ length: confettiCount }, () => new Confetti());

  let isRunning = true;

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    // Update & draw balloons
    balloons.forEach((b) => {
      b.update();
      b.draw();
    });

    // Update & draw confetti
    confetti.forEach((c) => {
      c.update();
      c.draw();
    });

    requestAnimationFrame(render);
  }

  render();

  // Fade out smoothly after 7 seconds so it doesn't distract forever
  setTimeout(() => {
    canvas.style.opacity = "0";
    setTimeout(() => {
      isRunning = false;
      canvas.remove();
    }, 1500);
  }, 7000);
});
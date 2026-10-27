/* ==========================================================================
   Interactive Features & Particle Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Compliments List
  const compliments = [
    "Your energy effortlessly lights up any room you walk into! ✨",
    "You have such an authentic sense of style and creativity. 🌸",
    "You're deeply resilient, capable, and stronger than you think. 💜",
    "Talking to you makes everything feel a little brighter and easier. 🌷",
    "You bring an unmatched spark and genuine warmth everywhere. 💖",
    "Never forget how talented and one-of-a-kind you are! 🌟"
  ];

  const complimentDisplay = document.getElementById('complimentDisplay');
  const newComplimentBtn = document.getElementById('newComplimentBtn');

  newComplimentBtn.addEventListener('click', () => {
    // Fade out
    complimentDisplay.style.opacity = '0';

    setTimeout(() => {
      // Pick a random compliment different from current
      let nextCompliment;
      do {
        nextCompliment = compliments[Math.floor(Math.random() * compliments.length)];
      } while (nextCompliment === complimentDisplay.innerText && compliments.length > 1);

      complimentDisplay.innerText = `"${nextCompliment}"`;
      // Fade in
      complimentDisplay.style.opacity = '1';
    }, 200);
  });

  // 2. Lightbox Gallery Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullUrl = item.getAttribute('data-full');
      lightboxImg.src = fullUrl;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);

  // Close on clicking backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 3. Ambient Floating Petal & Glow Particle Animation
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = [
    'rgba(247, 37, 133, 0.45)', // Pink
    'rgba(157, 78, 221, 0.45)', // Purple
    'rgba(255, 112, 166, 0.35)', // Light Pink
    'rgba(216, 180, 226, 0.35)'  // Soft Lavender
  ];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 1 + 0.5;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.5;
      this.rotation += this.rotationSpeed;

      // Wrap around when it falls off screen
      if (this.y > height + 20) {
        this.reset();
        this.y = -10;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();

      // Soft oval/petal shape
      ctx.ellipse(0, 0, this.size, this.size * 1.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particleCount = 45;
  const particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
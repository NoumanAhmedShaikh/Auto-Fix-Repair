// Additional 3D Animations for Auto Fix Repair Website

// Enhanced 3D Car Image Interaction
function enhanceCarImage() {
  const carImage3d = document.querySelector('.car-image-3d');
  if (!carImage3d) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let isHovering = false;
  
  // Mouse move event for 3D tilt effect
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    if (isHovering) {
      const rotateY = -15 + mouseX * 10;
      const rotateX = 5 + mouseY * 5;
      carImage3d.style.transform = `translateY(0px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
    }
  });
  
  // Touch events for mobile
  carImage3d.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isHovering = true;
    carImage3d.style.animationPlayState = 'paused';
    createSparkles(carImage3d);
  });
  
  carImage3d.addEventListener('touchend', (e) => {
    e.preventDefault();
    isHovering = false;
    carImage3d.style.animationPlayState = 'running';
    carImage3d.style.transform = '';
    removeSparkles();
  });
  
  // Mouse enter event
  carImage3d.addEventListener('mouseenter', () => {
    isHovering = true;
    carImage3d.style.animationPlayState = 'paused';
    createSparkles(carImage3d);
  });
  
  // Mouse leave event
  carImage3d.addEventListener('mouseleave', () => {
    isHovering = false;
    carImage3d.style.animationPlayState = 'running';
    carImage3d.style.transform = '';
    removeSparkles();
  });
  
  // Click event for additional effect
  carImage3d.addEventListener('click', () => {
    createClickEffect(carImage3d);
  });
  
  // Add floating particles around the car image
  createFloatingParticles(carImage3d);
}

// Create sparkle effect around the car image
function createSparkles(container) {
  const sparklesContainer = document.createElement('div');
  sparklesContainer.className = 'sparkles-container';
  sparklesContainer.style.cssText = `
    position: absolute;
    top: -50px;
    left: -50px;
    right: -50px;
    bottom: -50px;
    pointer-events: none;
    z-index: 10;
  `;
  
  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, #3b82f6, #10b981, #f59e0b);
      border-radius: 50%;
      animation: sparkleFloat 3s ease-in-out infinite;
      animation-delay: ${i * 0.2}s;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
    `;
    
    const angle = (i / 12) * Math.PI * 2;
    const radius = 100 + Math.random() * 50;
    sparkle.style.left = `${50 + Math.cos(angle) * radius}px`;
    sparkle.style.top = `${50 + Math.sin(angle) * radius}px`;
    
    sparklesContainer.appendChild(sparkle);
  }
  
  container.appendChild(sparklesContainer);
}

// Create floating particles around the car image
function createFloatingParticles(container) {
  const particlesContainer = container.querySelector('.car-image-particles');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 3px;
      height: 3px;
      background: linear-gradient(45deg, #3b82f6, #10b981);
      border-radius: 50%;
      animation: particleFloat 6s ease-in-out infinite;
      animation-delay: ${i * 0.5}s;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
    `;
    
    const angle = (i / 8) * Math.PI * 2;
    const radius = 80 + Math.random() * 40;
    particle.style.left = `${50 + Math.cos(angle) * radius}px`;
    particle.style.top = `${50 + Math.sin(angle) * radius}px`;
    
    particlesContainer.appendChild(particle);
  }
}

// Remove sparkles
function removeSparkles() {
  const sparklesContainer = document.querySelector('.sparkles-container');
  if (sparklesContainer) {
    sparklesContainer.remove();
  }
}

// Create click effect
function createClickEffect(container) {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
    z-index: 15;
  `;
  
  container.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS for new effects
const carImageStyles = document.createElement('style');
carImageStyles.textContent = `
  @keyframes sparkleFloat {
    0%, 100% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
    }
  }
  
  @keyframes particleFloat {
    0%, 100% {
      opacity: 0.3;
      transform: translateY(0px) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateY(-20px) scale(1.2);
    }
  }
  
  @keyframes rippleEffect {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
  
  .car-image-3d {
    cursor: pointer;
  }
  
  .car-image-3d:hover {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
  }
  
  /* Mobile touch effects */
  @media (max-width: 768px) {
    .car-image-3d {
      cursor: default;
    }
    
    .car-image-3d:active {
      filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.4));
      transform: scale(0.98);
    }
  }
`;
document.head.appendChild(carImageStyles);

// Initialize 3D effects
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    enhanceCarImage();
  }, 1000);
});

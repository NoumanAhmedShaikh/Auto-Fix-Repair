// Enhanced 3D Animations for Auto Fix Repair

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      // Animate hamburger icon
      const icon = mobileMenuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('hidden')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      }
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('svg');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      });
    });
  }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

const container = document.getElementById('three-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Create a more detailed car-like 3D model
function createCar() {
  const carGroup = new THREE.Group();
  
  // Car body (main chassis) - enhanced with better materials
  const bodyGeometry = new THREE.BoxGeometry(4, 1.5, 8);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3b82f6, 
    metalness: 0.8, 
    roughness: 0.2,
    envMapIntensity: 1.0
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 1;
  body.castShadow = true;
  body.receiveShadow = true;
  carGroup.add(body);
  
  // Car roof with better proportions
  const roofGeometry = new THREE.BoxGeometry(3.5, 1, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1e40af, 
    metalness: 0.8, 
    roughness: 0.2 
  });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 2.25;
  roof.position.z = -0.5;
  roof.castShadow = true;
  roof.receiveShadow = true;
  carGroup.add(roof);
  
  // Enhanced wheels with rims
  const wheelGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 16);
  const wheelMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1f2937, 
    metalness: 0.5, 
    roughness: 0.7 
  });
  
  // Rim geometry
  const rimGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.35, 8);
  const rimMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x6b7280, 
    metalness: 0.9, 
    roughness: 0.1 
  });
  
  const wheels = [];
  const wheelPositions = [
    { x: -1.5, y: 0.8, z: 2.5 },
    { x: 1.5, y: 0.8, z: 2.5 },
    { x: -1.5, y: 0.8, z: -2.5 },
    { x: 1.5, y: 0.8, z: -2.5 }
  ];
  
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    wheel.rotation.z = Math.PI / 2;
    rim.rotation.z = Math.PI / 2;
    wheel.position.set(pos.x, pos.y, pos.z);
    rim.position.set(pos.x, pos.y, pos.z);
    wheel.castShadow = true;
    rim.castShadow = true;
    carGroup.add(wheel);
    carGroup.add(rim);
    wheels.push({ wheel, rim });
  });
  
  // Enhanced headlights with glow effect
  const headlightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const headlightMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    emissive: 0xffffff,
    emissiveIntensity: 0.5
  });
  
  const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
  leftHeadlight.position.set(-1, 1.2, 4.2);
  carGroup.add(leftHeadlight);
  
  const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
  rightHeadlight.position.set(1, 1.2, 4.2);
  carGroup.add(rightHeadlight);
  
  // Enhanced taillights
  const taillightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const taillightMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff0000, 
    emissive: 0xff0000,
    emissiveIntensity: 0.3
  });
  
  const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
  leftTaillight.position.set(-1, 1.2, -4.2);
  carGroup.add(leftTaillight);
  
  const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
  rightTaillight.position.set(1, 1.2, -4.2);
  carGroup.add(rightTaillight);
  
  // Enhanced windows with better transparency
  const windowGeometry = new THREE.PlaneGeometry(3, 0.8);
  const windowMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x87ceeb, 
    transparent: true, 
    opacity: 0.6,
    metalness: 0.9,
    roughness: 0.1
  });
  
  const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
  frontWindow.position.set(0, 2.2, 1.5);
  frontWindow.rotation.x = -0.3;
  carGroup.add(frontWindow);
  
  const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
  backWindow.position.set(0, 2.2, -2.5);
  backWindow.rotation.x = 0.3;
  carGroup.add(backWindow);
  
  // Add side mirrors
  const mirrorGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.2);
  const mirrorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3b82f6, 
    metalness: 0.8, 
    roughness: 0.2 
  });
  
  const leftMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
  leftMirror.position.set(-2.1, 1.8, 1);
  carGroup.add(leftMirror);
  
  const rightMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
  rightMirror.position.set(2.1, 1.8, 1);
  carGroup.add(rightMirror);
  
  // Store wheels for animation
  carGroup.wheels = wheels;
  
  return carGroup;
}

const car = createCar();
scene.add(car);

// Enhanced lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Add multiple colored point lights for dynamic lighting
const blueLight = new THREE.PointLight(0x3b82f6, 1, 100);
blueLight.position.set(-10, 10, 0);
scene.add(blueLight);

const greenLight = new THREE.PointLight(0x10b981, 0.8, 100);
greenLight.position.set(10, 10, 0);
scene.add(greenLight);

const orangeLight = new THREE.PointLight(0xf59e0b, 0.6, 100);
orangeLight.position.set(0, 10, 10);
scene.add(orangeLight);

// Create floating 3D tools and parts with more variety
const tools = [];
const toolTypes = [
  { geometry: new THREE.BoxGeometry(0.5, 0.5, 2), color: 0xff6b6b }, // Wrench
  { geometry: new THREE.CylinderGeometry(0.1, 0.1, 1.5), color: 0x4ecdc4 }, // Screwdriver
  { geometry: new THREE.SphereGeometry(0.3, 16, 16), color: 0x45b7d1 }, // Bolt
  { geometry: new THREE.TorusGeometry(0.2, 0.1, 8, 16), color: 0x96ceb4 }, // Ring
  { geometry: new THREE.OctahedronGeometry(0.2), color: 0xfeca57 }, // Diamond
  { geometry: new THREE.BoxGeometry(0.8, 0.3, 0.8), color: 0xff9ff3 } // Box
];

for (let i = 0; i < 12; i++) {
  const toolType = toolTypes[i % toolTypes.length];
  const toolMaterial = new THREE.MeshStandardMaterial({ 
    color: toolType.color,
    metalness: 0.7,
    roughness: 0.3
  });
  const tool = new THREE.Mesh(toolType.geometry, toolMaterial);
  
  const angle = (i / 12) * Math.PI * 2;
  const radius = 15 + Math.random() * 5;
  tool.position.x = Math.cos(angle) * radius;
  tool.position.z = Math.sin(angle) * radius;
  tool.position.y = Math.random() * 8 + 5;
  
  // Add random rotation
  tool.rotation.x = Math.random() * Math.PI;
  tool.rotation.y = Math.random() * Math.PI;
  tool.rotation.z = Math.random() * Math.PI;
  
  scene.add(tool);
  tools.push(tool);
}

// Add floating 3D text elements
function create3DText(text, position, color) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 64;
  
  context.fillStyle = color;
  context.font = '48px Arial';
  context.textAlign = 'center';
  context.fillText(text, 128, 48);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({ 
    map: texture, 
    transparent: true,
    side: THREE.DoubleSide
  });
  
  const geometry = new THREE.PlaneGeometry(4, 1);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);
  
  return mesh;
}

// Add 3D text elements
const textElements = [
  create3DText('ENGINE', { x: -8, y: 12, z: 0 }, '#3b82f6'),
  create3DText('BRAKES', { x: 8, y: 12, z: 0 }, '#10b981'),
  create3DText('ELECTRICAL', { x: 0, y: 12, z: 8 }, '#f59e0b'),
  create3DText('TIRES', { x: 0, y: 12, z: -8 }, '#8b5cf6')
];

textElements.forEach(text => scene.add(text));

// Camera position and controls
camera.position.set(0, 8, 20);
camera.lookAt(0, 0, 0);

// Animation variables
let time = 0;
const carRotationSpeed = 0.005;
const toolRotationSpeed = 0.02;
let mouseX = 0;
let mouseY = 0;

// Mouse interaction
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Enhanced animation loop
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;
  
  // Rotate the car with mouse interaction
  car.rotation.y += carRotationSpeed + mouseX * 0.01;
  car.rotation.x += mouseY * 0.005;
  
  // Animate wheels with realistic rotation
  car.wheels.forEach(({ wheel, rim }) => {
    wheel.rotation.x += 0.1;
    rim.rotation.x += 0.1;
  });
  
  // Enhanced floating tools animation
  tools.forEach((tool, index) => {
    tool.rotation.y += toolRotationSpeed;
    tool.rotation.x += toolRotationSpeed * 0.5;
    tool.rotation.z += toolRotationSpeed * 0.3;
    tool.position.y += Math.sin(time + index) * 0.02;
    
    // Add orbital movement
    const orbitRadius = 15 + Math.sin(time * 0.5 + index) * 2;
    const orbitAngle = (index / tools.length) * Math.PI * 2 + time * 0.2;
    tool.position.x = Math.cos(orbitAngle) * orbitRadius;
    tool.position.z = Math.sin(orbitAngle) * orbitRadius;
  });
  
  // Animate 3D text elements
  textElements.forEach((text, index) => {
    text.rotation.y = Math.sin(time * 0.5 + index) * 0.3;
    text.position.y += Math.sin(time + index) * 0.01;
  });
  
  // Dynamic camera movement
  camera.position.x = Math.sin(time * 0.5) * 3;
  camera.position.y = 8 + Math.sin(time * 0.3) * 1.5;
  camera.position.z = 20 + Math.cos(time * 0.4) * 2;
  camera.lookAt(0, 0, 0);
  
  // Animate lights
  blueLight.position.x = Math.sin(time) * 15;
  blueLight.position.z = Math.cos(time) * 15;
  
  greenLight.position.x = Math.cos(time * 0.7) * 15;
  greenLight.position.z = Math.sin(time * 0.7) * 15;
  
  orangeLight.position.y = 10 + Math.sin(time * 0.9) * 5;
  
  // Add pulsing effect to headlights
  const headlights = scene.children.filter(child => 
    child.material && child.material.emissiveIntensity !== undefined
  );
  headlights.forEach((light, index) => {
    light.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + index) * 0.2;
  });
  
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add scroll-based 3D effects
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  // Parallax effect for the car
  car.position.y = rate * 0.1;
  
  // Adjust camera based on scroll
  camera.position.y = 8 + Math.sin(time * 0.3) * 1.5 + (scrolled * 0.01);
});

// Add 3D hover effects for service cards
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      // Create a 3D effect by adding a glow
      card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.4)';
      card.style.transform = 'translateY(-15px) scale(1.05)';
      
      // Animate corresponding 3D tool
      if (tools[index]) {
        tools[index].scale.setScalar(1.5);
        tools[index].material.emissive.setHex(0x444444);
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
      card.style.transform = '';
      
      if (tools[index]) {
        tools[index].scale.setScalar(1);
        tools[index].material.emissive.setHex(0x000000);
      }
    });
  });
});

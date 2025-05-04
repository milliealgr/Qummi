// Obtener el canvas y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Cargar la imagen de fondo usando roomConfig
let backgroundImage = new Image();
backgroundImage.src = roomConfig.backgroundSrc;

// Cargar la imagen del sprite usando roomConfig
let spriteImage = new Image();
spriteImage.src = roomConfig.spriteSrc;

// Configurar el objeto "bunny" con la posición y escala definidos en roomConfig
let bunny = {
  x: roomConfig.spriteX !== undefined ? roomConfig.spriteX : 300,
  y: roomConfig.spriteY !== undefined ? roomConfig.spriteY : 300,
  width: 0,   // Se definirá al cargar la imagen
  height: 0,  // Se definirá al cargar la imagen
  scaleFactor: roomConfig.scaleFactor !== undefined ? roomConfig.scaleFactor : 0.5,
  frameTimer: 0,
  frameDelay: 300 // milisegundos entre frames (para animación, si se desea)
};

// Al cargar el sprite, se calculan sus dimensiones escaladas e inicia el bucle de animación
spriteImage.onload = function() {
  bunny.width = spriteImage.width * bunny.scaleFactor;
  bunny.height = spriteImage.height * bunny.scaleFactor;
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
};

let lastTime = 0;
function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

function update(dt) {
  bunny.frameTimer += dt;
  if (bunny.frameTimer > bunny.frameDelay) {
    bunny.frameTimer = 0;
    // Aquí se podría actualizar el frame del sprite en caso de tener animación múltiple
  }
}

function draw() {
  // Dibujar fondo y sprite escalado
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spriteImage, bunny.x, bunny.y, bunny.width, bunny.height);
}

// Navegación con botones de flecha
document.getElementById('navLeft').addEventListener('click', function() {
  window.location.href = roomConfig.leftLink;
});

document.getElementById('navRight').addEventListener('click', function() {
  window.location.href = roomConfig.rightLink;
});

// Menú desplegable
const menuButton = document.getElementById('menuButton');
const menuPanel = document.getElementById('menuPanel');

menuButton.addEventListener('click', function() {
  if (menuPanel.style.display === 'none' || menuPanel.style.display === '') {
    menuPanel.style.display = 'block';
  } else {
    menuPanel.style.display = 'none';
  }
});

// Opcional: agregar manejadores a los elementos del menú
document.querySelectorAll('.menu-panel li').forEach(item => {
  item.addEventListener('click', function() {
    console.log("Seleccionaste:", this.textContent);
    menuPanel.style.display = 'none';
  });
});

document.getElementById('shopButton')
  .addEventListener('click', () => {
    window.location.href = 'tienda.html';
  });


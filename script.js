// Obtener el canvas y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

// Cargar la imagen de fondo
const backgroundImage = new Image();
backgroundImage.src   = roomConfig.backgroundSrc;

// Cargar la imagen del sprite
const spriteImage = new Image();
spriteImage.src   = roomConfig.spriteSrc;

// Configurar el “bunny”
const bunny = {
  x:           roomConfig.spriteX     ?? 300,
  y:           roomConfig.spriteY     ?? 300,
  width:       0,
  height:      0,
  scaleFactor: roomConfig.scaleFactor ?? 0.5,
  frameTimer:  0,
  frameDelay:  300
};

let lastTime = 0;

// Cuando cargue el sprite, calculamos su tamaño y arrancamos el loop
spriteImage.onload = () => {
  bunny.width  = spriteImage.width  * bunny.scaleFactor;
  bunny.height = spriteImage.height * bunny.scaleFactor;
  lastTime     = performance.now();
  requestAnimationFrame(gameLoop);
};

// Bucle principal
function gameLoop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

function update(dt) {
  bunny.frameTimer += dt;
  if (bunny.frameTimer > bunny.frameDelay) {
    bunny.frameTimer = 0;
    // aquí podrías avanzar frame de animación si tuvieras varios
  }
}

function draw() {
  // dibujar fondo
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  // dibujar sprite solo si ya tenemos ancho y alto
  if (bunny.width && bunny.height) {
    ctx.drawImage(spriteImage, bunny.x, bunny.y, bunny.width, bunny.height);
  }
}

// Esperar a que el DOM esté listo para enganchar botones sin errores
window.addEventListener('DOMContentLoaded', () => {
  // Botón Volver (solo en tienda.html)
  const backBtn = document.getElementById('backButton');
  if (backBtn) backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Botón Tienda (en otras páginas)
  const shopBtn = document.getElementById('shopButton');
  if (shopBtn) shopBtn.addEventListener('click', () => {
    window.location.href = 'tienda.html';
  });

  // Botón Inicio (home)
  const homeBtn = document.getElementById('homeButton');
  if (homeBtn) homeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Flechas de navegación
  const navLeft = document.getElementById('navLeft');
  if (navLeft && roomConfig.leftLink) navLeft.addEventListener('click', () => {
    window.location.href = roomConfig.leftLink;
  });
  const navRight = document.getElementById('navRight');
  if (navRight && roomConfig.rightLink) navRight.addEventListener('click', () => {
    window.location.href = roomConfig.rightLink;
  });

  // Menú desplegable
  const menuBtn   = document.getElementById('menuButton');
  const menuPanel = document.getElementById('menuPanel');
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', () => {
      menuPanel.style.display = menuPanel.style.display === 'block'
        ? 'none' : 'block';
    });
    document.querySelectorAll('.menu-panel li').forEach(item => {
      item.addEventListener('click', () => menuPanel.style.display = 'none');
    });
  }
});

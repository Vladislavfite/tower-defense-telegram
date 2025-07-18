// Отрисовка карты при старте игры
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const mapImage = new Image();
mapImage.src = 'assets/map/map.png';

function drawMap() {
  ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
}

mapImage.onload = () => {
  resizeCanvas();
  drawMap();
};

window.addEventListener('resize', () => {
  resizeCanvas();
  drawMap();
});

console.log('Game started');

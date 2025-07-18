// Отрисовка карты при старте игры
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const mapImage = new Image();
mapImage.src = 'assets/map/map.png';

mapImage.onload = () => {
  canvas.width = mapImage.width;
  canvas.height = mapImage.height;
  ctx.drawImage(mapImage, 0, 0);
};

console.log('Game started');
